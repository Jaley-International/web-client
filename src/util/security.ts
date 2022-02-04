import forge, { Hex } from "node-forge";
import assert from "assert";
import { request } from "./communication";


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

export interface FileUploadReqData {
    // TODO: containingFolderId: string;
    ref: string;
    encryptedMetadata: string;
    encryptedNodeKey: string;
    // TODO: parentEncryptedKey: string;
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

    const cipher = forge.cipher.createCipher("AES-GCM", key);
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

    const decipher = forge.cipher.createDecipher("AES-GCM", key);
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
 */
export async function register(username: string, email: string, password: string): Promise<RegisterReqData> {
    // Generate AES MasterKey (256 bits)
    const masterKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate Client Random Value (128 bits)
    const clientRandomValue = forge.util.bytesToHex(forge.random.getBytesSync(16));

    // Generate RSA key pair
    const sharingKeys = await generateRSAKeyPair();
    const privateSharingKey = forge.pki.privateKeyToPem(sharingKeys.privateKey);
    const publicSharingKey = forge.pki.publicKeyToPem(sharingKeys.publicKey);

    // Generate Salt
    const salt = sha256(addPadding(username + INSTANCE_ID + clientRandomValue, 128));

    // PPF
    const derivedKey = await pbkdf2(password, salt);
    const derivedEncryptionKey = derivedKey.substr(0, 64);
    const derivedAuthenticationKey = derivedKey.substr(64);

    // Encrypting data before sending to the API
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
 *
 */
export async function authenticate(username: string, password: string, salt: string): Promise<boolean> {

    // PPF
    const derivedKey = await pbkdf2(password, salt);
    const derivedEncryptionKey = derivedKey.substr(0, 64);
    const derivedAuthenticationKey = derivedKey.substr(64);

    // Authenticating (session identifier request with encrypted keys)
    const response = await request("POST", "http://localhost:3001/api/users/login", {
        username: username,
        derivedAuthenticationKey: derivedAuthenticationKey
    });

    if (response.status !== 200)
        return false;

    // Decrypting keys
    const masterKey = decrypt("AES-CTR", derivedEncryptionKey, salt, response.data.encryptedMasterKey);
    const privateSharingKey = decrypt("AES-CTR", masterKey, salt, response.data.encryptedRsaPrivateSharingKey);
    const sessionIdentifier = rsaPrivateDecrypt(privateSharingKey, response.data.encryptedSessionIdentifier);

    // Storing keys to the session storage
    sessionStorage.setItem("masterKey", masterKey);
    sessionStorage.setItem("publicSharingKey", response.data.rsaPublicSharingKey);
    sessionStorage.setItem("privateSharingKey", privateSharingKey);
    sessionStorage.setItem("sessionIdentifier", sessionIdentifier);

    return true;
}


/**
 * File upload client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {object}      file            The file uploaded by user.
 */
export async function fileUpload(file: object): Promise<FileUploadReqData> {

    // Generate Node Key (256 bits)
    const nodeKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate initialization vector (128 bits)
    const iv = forge.random.getBytesSync(16);

    // Generate Encrypted Node Key
    const encryptedNodeKey = encrypt("AES-CTR", sessionStorage.masterKey, iv, nodeKey);

    // TODO: Generate Parent Encrypted Key

    // Generate Encrypted Meta-data
    const encryptedMetadata = encrypt("AES-GCM", nodeKey, iv, JSON.stringify(file));

    // Encrypt file
    const fileString = JSON.stringify(file);
    const fileBuffer = Buffer.from(fileString);
    const encryptedFile = encryptBuffer(fileBuffer, nodeKey, iv).toString();

    // Send file to the API
    const response = await request("POST", "http://localhost:3001/api/fileSystem/uploadFile", {
        file: encryptedFile
    });

    if (response.status !== 200)
        return new Promise<FileUploadReqData>((resolve, reject) => null);

    const ref = response.data;
    console.log("encrypted file uploaded");
    console.log("ref: ", ref);

    return {
        // TODO: containingFolderId: containingFolderId,
        ref: ref,
        encryptedMetadata: encryptedMetadata,
        encryptedNodeKey: encryptedNodeKey,
        // TODO: parentEncryptedKey: parentEncryptedKey
    };
}