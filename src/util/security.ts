import forge, { Hex } from "node-forge";
import assert from "assert";
import { request } from "./communication";
import { setCookies } from "cookies-next";


// TODO : Change instance ID to be unique for each instance
export const INSTANCE_ID = "PEC-4Kua7tTa5XAb";

export interface RegisterReqData {
    username: string;
    email: string;
    clientRandomValue: string;
    encryptedMasterKey: string;
    hashedAuthenticationKey: string;
    encryptedRsaPrivateSharingKey: string;
    rsaPublicSharingKey: string;
}

export interface Session {
    id?: string;
    exp?: number;
}


/**
 * Generate a 2048-bits RSA key pair
 * @return {Promise<forge.pki.KeyPair>}
 */
async function generateRSAKeyPair(): Promise<forge.pki.KeyPair> {
    return new Promise((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, (err, keypair) => {
            if (err)
                reject(err);
            resolve(keypair);
        });
    });
}


/**
 * Adds padding to a string to prevent timing attacks
 * @param {string}      str             Original string.
 * @param {number}      length          Desired length of the final string.
 * @return {string}
 */
function addPadding(str: string, length: number): string {
    assert(str.length <= length);
    while (str.length < length)
        str += "_";
    return str;
}


/**
 * Derives a password to a key using PBKDF Version 2
 * @param {string}      password        Password to be derived.
 * @param {Hex}         salt            Salt.
 * @return {Hex}
 */
function pbkdf2(password: string, salt: string): Promise<Hex> {
    return new Promise((resolve, reject) => {
        forge.pkcs5.pbkdf2(password, salt, 100000, 64, (err, derivedKey) => {
            if (err || !derivedKey)
                reject(err);
            else
                resolve(forge.util.bytesToHex(derivedKey));
        });
    });
}


/**
 * Hash using SHA256 the input string
 * @param {string}      str             String to be hashed.
 * @return {string}
 */
function sha256(str: string): Hex {
    return forge.md.sha256.create().update(str).digest().toHex();
}


/**
 * Hash using SHA512 the input string
 * @param {string}      str             String to be hashed.
 * @return {string}
 */
function sha512(str: string): Hex {
    return forge.md.sha512.create().update(str).digest().toHex();
}


/**
 * Encrypts a string using AES
 * @param {string}      operation       Cipher and block mode of operation
 * @param {Hex}         key             Encryption key
 * @param {Hex}         iv              Initialization vector
 * @param {string}      str             String to encrypt
 * @return {Hex}                        Encrypted string
 */
function encrypt(operation: "AES-CTR" | "AES-GCM", key: Hex, iv: string, str: string): Hex {
    const cipher = forge.cipher.createCipher(operation, forge.util.hexToBytes(key));
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(str));
    cipher.finish();
    return cipher.output.toHex();
}


/**
 * Decrypts a string using AES
 * @param {string}      operation       Cipher and block mode of operation
 * @param {Hex}         key             Encryption key
 * @param {Hex}         iv              Initialization vector (128 bits)
 * @param {Hex}         str             String to decrypt
 * @return {string}                     Decrypted string
 */
function decrypt(operation: "AES-CTR" | "AES-GCM", key: Hex, iv: Hex, str: Hex): string {
    const decipher = forge.cipher.createDecipher(operation, forge.util.hexToBytes(key));
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(str)));
    return forge.util.hexToBytes(decipher.output.toHex());
}


/**
 * Decrypts a string using RSA (private key)
 * @param {Hex}         key             RSA Private key
 * @param {Hex}         value           String to decrypt
 * @return {Hex}                        Decrypted value
 */
export function rsaPrivateDecrypt(key: string, value: Hex): Hex {
    const privateKey = forge.pki.privateKeyFromPem(key);
    return forge.util.bytesToHex(privateKey.decrypt(forge.util.hexToBytes(value)));
}


/**
 * Encrypts a buffer using RSA-GCM
 * @param {Buffer}      buffer          Buffer to encrypt
 * @param {Hex}         key             Encryption key
 * @param {Hex}         iv              Initialization vector (128 bits)
 * @return {Buffer}                     Encrypted buffer
 */
export function encryptBuffer(buffer: Buffer, key: Hex, iv: Hex): Buffer {
    const cipher = forge.cipher.createCipher("AES-GCM", forge.util.hexToBytes(key));
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(buffer.toString("binary")));
    cipher.finish();

    const encryptedBuffer = forge.util.createBuffer();
    encryptedBuffer.putBuffer(cipher.output);

    return Buffer.from(encryptedBuffer.getBytes(), "binary");
}


/**
 * Decrypts a buffer using RSA-GCM
 * @param {Buffer}      buffer          Buffer to decrypt
 * @param {Hex}         key             Encryption key
 * @param {Hex}         iv              Initialization vector (128 bits)
 * @return {Buffer}                     Decrypted buffer
 */
export function decryptBuffer(buffer: Buffer, key: Hex, iv: Hex): Buffer {

    const decipher = forge.cipher.createDecipher("AES-GCM", forge.util.hexToBytes(key));
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(buffer.toString("binary")));
    decipher.finish();

    const decryptedBuffer = forge.util.createBuffer();
    decryptedBuffer.putBuffer(decipher.output);

    return Buffer.from(decryptedBuffer.getBytes(), "binary");
}


/**
 * User registration client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {string}      username        New account's username.
 * @param {string}      email           New account's email address.
 * @param {string}      password        New account's password.
 * @param {function}    updateStatus    Function to update the registration status.
 * @return {RegisterReqData}            Data to be sent to the API.
 */
export async function register(username: string, email: string, password: string, updateStatus: (message: string) => void): Promise<RegisterReqData> {
    // Generate AES MasterKey (256 bits)
    updateStatus("Generating Master Key...");
    const masterKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate Client Random Value (128 bits)
    updateStatus("Generating Client Random Value...");
    const clientRandomValue = forge.util.bytesToHex(forge.random.getBytesSync(16));

    // Generate RSA key pair
    updateStatus("Generating RSA key pair...");
    const sharingKeys = await generateRSAKeyPair();
    const privateSharingKey = forge.pki.privateKeyToPem(sharingKeys.privateKey);
    const publicSharingKey = forge.pki.publicKeyToPem(sharingKeys.publicKey);

    // Generate Salt
    updateStatus("Computing Salt...");
    const salt = sha256(addPadding(username + INSTANCE_ID + clientRandomValue, 128));

    // PPF
    updateStatus("Processing password...");
    const derivedKey = await pbkdf2(password, salt);
    const derivedEncryptionKey = derivedKey.substring(0, 64);
    const derivedAuthenticationKey = derivedKey.substring(64);

    // Encrypting data before sending to the API
    updateStatus("Encrypting keys...");
    const encryptedPrivateSharingKey = encrypt("AES-CTR", masterKey, salt, privateSharingKey);
    const encryptedMasterKey = encrypt("AES-CTR", derivedEncryptionKey, salt, masterKey);
    const hashedAuthenticationKey = sha512(derivedAuthenticationKey);

    return {
        username: username,
        email: email,
        clientRandomValue: clientRandomValue,
        encryptedMasterKey: encryptedMasterKey,
        hashedAuthenticationKey: hashedAuthenticationKey,
        encryptedRsaPrivateSharingKey: encryptedPrivateSharingKey,
        rsaPublicSharingKey: publicSharingKey
    };
}


/**
 * User authentication client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit (from step 3)
 *
 * @param {string}      username        Account's username.
 * @param {string}      password        Account's password.
 * @param {string}      salt            Account's salt.
 * @param {string}      api_url         API URL.
 * @param {function}    updateStatus    Function to update the authentication status.
 * @return {boolean}                    True if authentication is successful, false otherwise
 */
export async function authenticate(username: string, password: string, salt: string, api_url: string, updateStatus: (message: string) => void): Promise<boolean> {

    // PPF
    updateStatus("Processing password...");
    const derivedKey = await pbkdf2(password, salt);
    const derivedEncryptionKey = derivedKey.substring(0, 64);
    const derivedAuthenticationKey = derivedKey.substring(64);

    // Authenticating (session identifier request with encrypted keys)
    updateStatus("Requesting keys...");
    const response = await request("POST", `${api_url}/users/login`, {
        username: username,
        derivedAuthenticationKey: derivedAuthenticationKey
    });

    if (response.status !== "SUCCESS")
        return false;

    // Decrypting keys
    updateStatus("Decrypting keys...");
    const masterKey = decrypt("AES-CTR", derivedEncryptionKey, salt, response.data.encryptedMasterKey);
    const privateSharingKey = decrypt("AES-CTR", masterKey, salt, response.data.encryptedRsaPrivateSharingKey);
    const sessionIdentifier = rsaPrivateDecrypt(privateSharingKey, response.data.encryptedSessionIdentifier);

    // Storing keys to the session storage
    sessionStorage.setItem("masterKey", masterKey);
    sessionStorage.setItem("publicSharingKey", response.data.rsaPublicSharingKey);
    sessionStorage.setItem("privateSharingKey", privateSharingKey);

    // Storing session in cookies
    setCookies("session", {
        id: sessionIdentifier,
        exp: response.data.sessionExpire
    }, {
        sameSite: true,
        secure: true
    });

    return true;
}


/**
 * File upload client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {File}        file                File to upload.
 * @param {number}      containingFolderID  ID of the containing folder.
 * @param {number}      parentFolderKey     Parent folder's key.
 * @param {string}      api_url             API URL.
 * @return {boolean}                        (Temporary) True if upload is successful, false otherwise
 */
export async function uploadFile(file: File, containingFolderID: number, parentFolderKey: Hex, api_url: string): Promise<boolean> {

    // Generate Node Key (256 bits)
    const nodeKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate initialization vector (128 bits)
    const iv = forge.random.getBytesSync(16);

    // Reading file
    const buffer = Buffer.from(await file.arrayBuffer());

    // Encrypt file
    // TODO compress file before encryption
    // TODO make encryption process asynchronous
    const encryptedFile = await encryptBuffer(buffer, nodeKey, iv);

    // Sending file to the server
    const fileSubmitResponse = await request("POST", `${api_url}/filesystems/document`, {
        file: encryptedFile
    }, {"Content-Type": "multipart/form-data"});
    if (fileSubmitResponse.status !== "SUCCESS")
        return false;
    const ref = fileSubmitResponse.data.ref;

    // Getting and encrypting file meta data
    const metaData = {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        size: file.size
    }
    const encryptedMetadata = encrypt("AES-GCM", nodeKey, iv, JSON.stringify(metaData));

    // Compute Encrypted Node Key
    const encryptedNodeKey = encrypt("AES-CTR", sessionStorage.masterKey, iv, nodeKey);

    // Compute Parent Encrypted Key
    const parentEncryptedKey = encrypt("AES-CTR", parentFolderKey, iv, nodeKey);

    // Submitting file data to the API
    const metadataSubmitResponse = await request("POST", `${api_url}/filesystem/file`, {
        ref: ref,
        containingFolderID: containingFolderID,
        encryptedMetadata: encryptedMetadata,
        encryptedNodeKey: encryptedNodeKey,
        parentEncryptedKey: parentEncryptedKey
    });

    return metadataSubmitResponse.status === "SUCCESS";
}


/**
 * Validates user's session
 *
 * @param {Session}     session         Session to validate.
 * @param {string}      api_url         API URL.
 * @return {boolean}                    True if validation is successful, false otherwise
 */
export function validateSession(session: Session, api_url: string): boolean {

    // Session not set
    if (!session.id || !session.exp)
        return false;

    // Session expired
    if (Date.now() > session.exp)
        return false;

    // TODO Session API verification

    return true;
}
