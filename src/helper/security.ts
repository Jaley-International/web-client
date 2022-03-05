import forge, {Hex} from "node-forge";
import assert from "assert";


/**
 * Generate a 2048-bits RSA key pair
 * @return {Promise<forge.pki.KeyPair>}
 */
export async function generateRSAKeyPair(): Promise<forge.pki.KeyPair> {
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
export function addPadding(str: string, length: number): string {
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
export async function pbkdf2(password: string, salt: string): Promise<Hex> {
    const key = await crypto.subtle.importKey("raw", Buffer.from(password), "PBKDF2", false, ["deriveBits"]);
    const derivedBits = await crypto.subtle.deriveBits({
        name: "PBKDF2",
        hash: "SHA-512",
        salt: Buffer.from(salt),
        iterations: 1000000
    }, key, 512);
    const derived = Buffer.from(derivedBits);

    return derived.toString("hex");
}


/**
 * Hash using SHA256 the input string
 * @param {string}      str             String to be hashed.
 * @return {string}
 */
export function sha256(str: string): Hex {
    return forge.md.sha256.create().update(str).digest().toHex();
}


/**
 * Hash using SHA512 the input string
 * @param {string}      str             String to be hashed.
 * @return {string}
 */
export function sha512(str: string): Hex {
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
export function encrypt(operation: "AES-CTR" | "AES-GCM", key: Hex, iv: string, str: string): Hex {
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
 * @param {string}      iv              Initialization vector (128 bits)
 * @param {Hex}         str             String to decrypt
 * @return {string}                     Decrypted string
 */
export function decrypt(operation: "AES-CTR" | "AES-GCM", key: Hex, iv: string, str: Hex): string {
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
 * @param {string}      iv              Initialization vector (128 bits)
 * @return {[Buffer, Hex]}              Encrypted file as buffer and cipher tag
 */
export function encryptBuffer(buffer: Buffer, key: Hex, iv: string): [Buffer, Hex] {
    const cipher = forge.cipher.createCipher("AES-GCM", forge.util.hexToBytes(key));
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(buffer.toString("binary")));
    cipher.finish();

    const encryptedBuffer = forge.util.createBuffer();
    encryptedBuffer.putBuffer(cipher.output);

    return [Buffer.from(encryptedBuffer.getBytes(), "binary"), cipher.mode.tag.toHex()];
}


/**
 * Decrypts a buffer using RSA-GCM
 * @param {Buffer}      buffer          Buffer to decrypt
 * @param {Hex}         key             Encryption key
 * @param {string}      iv              Initialization vector (128 bits)
 * @param {string}      tag             Cipher tag
 * @return {Buffer}                     Decrypted buffer
 */
export function decryptBuffer(buffer: Buffer, key: Hex, iv: string, tag: string): Buffer | null {

    const decipher = forge.cipher.createDecipher("AES-GCM", forge.util.hexToBytes(key));
    decipher.start({iv: iv, tag: new forge.util.ByteStringBuffer(tag)});
    decipher.update(forge.util.createBuffer(buffer.toString("binary")));
    const finish = decipher.finish();

    const decryptedBuffer = forge.util.createBuffer();
    decryptedBuffer.putBuffer(decipher.output);

    if (finish)
        return Buffer.from(decryptedBuffer.getBytes(), "binary");
    return null;
}
