import forge, {Hex} from "node-forge";
import assert from "assert";


// TODO : Change instance ID to be unique for each instance
export const INSTANCE_ID = "PEC-4Kua7tTa5XAb";


/**
 * Generate a 2048-bits RSA key pair
 * @return {Promise<forge.pki.KeyPair>}
 */
async function generateRSAKeyPair(): Promise<forge.pki.KeyPair> {
    return new Promise((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({bits: 2048, workers: 2}, (err, keypair) => {
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
 * Hash using SHA256 the input string
 * @param {string}      str             String to be hashed.
 * @return {string}
 */
function sha256(str: string): Hex {
    return forge.md.sha256.create().update(str).digest().toHex();
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
    const cipher = forge.cipher.createCipher(operation, key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(str));
    cipher.finish();
    return cipher.output.toHex();
}


/**
 * Decrypts a string using AES
 * @param {string}      operation       Cipher and block mode of operation
 * @param {Hex}         key             Encryption key
 * @param {Hex}         iv              Initialization vector
 * @param {Hex}         str             String to decrypt
 * @return {string}                     Decrypted string
 */
function decrypt(operation: "AES-CTR" | "AES-GCM", key: Hex, iv: Hex, str: Hex): string {
    const decipher = forge.cipher.createDecipher(operation, key);
    decipher.start({iv: iv});
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(str)));
    return forge.util.hexToBytes(decipher.output.toHex());
}


/**
 * User registration client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {string}      username        New account's username.
 * @param {string}      email           New account's email address.
 * @param {string}      password        New account's password.
 */
export async function register(username: string, email: string, password: string): Promise<void> {

    // Generate AES MasterKey (128 bits)
    const masterKey = forge.util.bytesToHex(forge.random.getBytesSync(16));

    // Generate Client Random Value (128 bits)
    const clientRandomValue = forge.util.bytesToHex(forge.random.getBytesSync(16));

    // Generate RSA key pair
    const sharingKeys = await generateRSAKeyPair();
    const privateSharingKey = forge.pki.privateKeyToPem(sharingKeys.privateKey);
    const publicSharingKey = forge.pki.publicKeyToPem(sharingKeys.publicKey);

    // Generate Salt
    const salt = sha256(addPadding(username + INSTANCE_ID + clientRandomValue, 128));

    // PPF
    const derivedKey = forge.util.bytesToHex(forge.pkcs5.pbkdf2(password, salt, 100000, 32));
    const derivedEncryptionKey = derivedKey.substr(0, 32);
    const derivedAuthenticationKey = derivedKey.substr(32);

    // Encrypting data before sending to the API
    const encryptedPrivateSharingKey = encrypt("AES-CTR", masterKey, salt, privateSharingKey);
    const encryptedMasterKey = encrypt("AES-CTR", derivedEncryptionKey, salt, masterKey);
    const hashedAuthenticationKey = sha256(derivedAuthenticationKey);

    // TODO Send the following data to the API :
    console.log(email);
    console.log(username);
    console.log(clientRandomValue);
    console.log(encryptedMasterKey);
    console.log(hashedAuthenticationKey);
    console.log(encryptedPrivateSharingKey);
    console.log(publicSharingKey);
}
