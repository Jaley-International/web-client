import forge, {Hex} from "node-forge";
import {APIResponse, request} from "./communication";
import {removeCookies, setCookies} from "cookies-next";
import {
    addPadding,
    decrypt,
    decryptBuffer,
    encrypt,
    encryptBuffer,
    generateRSAKeyPair,
    pbkdf2,
    rsaPrivateDecrypt,
    sha256,
    sha512,
} from "./security";
import getConfig from "next/config";
import User, {UserAccessLevel} from "../model/User";

export interface EncryptedNode {
    id: number;
    iv: Hex;
    tag: Hex;
    encryptedNodeKey: Hex;
    encryptedMetadata: Hex;
    type: "FOLDER" | "FILE";
    ref: string;
    parentEncryptedKey: Hex;
    children: EncryptedNode[];
}

export interface ShareLink {
    shareId: string;
    iv: Hex;
    encryptedNodeKey: Hex;
    encryptedShareKey: Hex;
}

export interface MetaData {
    name: string;
    type?: string;
    lastModified?: number;
    size?: number;
    [key: string]: any;
}

export interface Node {
    id: number;
    iv: Hex;
    tag: Hex;
    nodeKey: Hex;
    metaData: MetaData;
    type: "FOLDER" | "FILE";
    ref: string;
    parentKey: Hex;
    children: Node[];
    shareLink?: ShareLink;
}

export interface Session {
    id?: string;
    exp?: number;
}

/**
 * User registration client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {string}      registerKey     New account's username.
 * @param {string}      password        New account's password.
 * @param {function}    updateStatus    Function to update the registration status.
 * @return {string}                     Status code returned by API.
 */
export async function register(
    registerKey: string,
    password: string,
    updateStatus: (message: string) => void
): Promise<string> {

    const {publicRuntimeConfig} = getConfig();

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
    const salt = sha256(addPadding(registerKey + publicRuntimeConfig.instanceId + clientRandomValue, 128));

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

    const registerData = {
        registerKey: registerKey,
        clientRandomValue: clientRandomValue,
        encryptedMasterKey: encryptedMasterKey,
        hashedAuthenticationKey: hashedAuthenticationKey,
        encryptedRsaPrivateSharingKey: encryptedPrivateSharingKey,
        rsaPublicSharingKey: publicSharingKey
    };

    updateStatus("Submitting...");
    const response = await request("POST", `${publicRuntimeConfig.apiUrl}/users/register`, registerData);
    return response.status;
}


/**
 * User authentication client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {string}      username        Account's username.
 * @param {string}      password        Account's password.
 * @param {function}    updateStatus    Function to update the authentication status.
 * @return {boolean}                    True if authentication is successful, false otherwise
 */
export async function authenticate(
    username: string,
    password: string,
    updateStatus: (message: string) => void
): Promise<boolean> {

    const {publicRuntimeConfig} = getConfig();

    // Salt request
    updateStatus("Requesting salt...");
    const saltResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/users/${username}/salt`, {});

    if (saltResponse.status !== "SUCCESS")
        return false;

    const salt = saltResponse.data.salt;

    // PPF
    updateStatus("Processing password...");
    const derivedKey = await pbkdf2(password, salt);
    const derivedEncryptionKey = derivedKey.substring(0, 64);
    const derivedAuthenticationKey = derivedKey.substring(64);

    // Authenticating (session identifier request with encrypted keys)
    updateStatus("Requesting keys...");
    const authResponse = await request("POST", `${publicRuntimeConfig.apiUrl}/users/login`, {
        username: username,
        derivedAuthenticationKey: derivedAuthenticationKey
    });

    if (authResponse.status !== "SUCCESS")
        return false;

    // Decrypting keys
    updateStatus("Decrypting keys...");
    const masterKey = decrypt("AES-CTR", derivedEncryptionKey, salt, authResponse.data.loginDetails.encryptedMasterKey);
    const privateSharingKey = decrypt("AES-CTR", masterKey, salt, authResponse.data.loginDetails.encryptedRsaPrivateSharingKey);
    const sessionIdentifier = rsaPrivateDecrypt(privateSharingKey, authResponse.data.loginDetails.encryptedSessionIdentifier);

    // Storing keys to the session storage
    localStorage.setItem("masterKey", masterKey);
    localStorage.setItem("publicSharingKey", authResponse.data.loginDetails.rsaPublicSharingKey);
    localStorage.setItem("privateSharingKey", privateSharingKey);

    // Storing session in cookies
    setCookies("session", {
        id: sessionIdentifier,
        exp: authResponse.data.loginDetails.sessionExpire
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
 * @param {Hex}         parentFolderKey     Parent folder's key.
 * @return {boolean}                        (Temporary) True if upload is successful, false otherwise
 */
export async function uploadFile(
    file: File, containingFolderID: number,
    parentFolderKey: Hex
): Promise<boolean> {

    const {publicRuntimeConfig} = getConfig();

    // Generate Node Key (256 bits)
    const nodeKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate initialization vector (128 bits)
    const iv = forge.random.getBytesSync(16);

    // Reading file
    const buffer = Buffer.from(await file.arrayBuffer());

    // Encrypt file
    // TODO compress file before encryption
    // TODO make encryption process asynchronous
    const [encryptedFile, tag] = encryptBuffer(buffer, nodeKey, iv);

    // Sending file to the server
    const ffile = new File([encryptedFile], "file.enc");
    const formData = new FormData();
    formData.append("file", ffile);

    const contentResponse = await request(
        "POST",
        `${publicRuntimeConfig.apiUrl}/file-system/content`,
        formData,
        {"Content-Type": "multipart/form-data; "});
    if (contentResponse.status !== "SUCCESS")
        return false;
    const ref = contentResponse.data.ref;

    // Getting and encrypting file meta data
    const metaData = {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        size: file.size
    }
    const encryptedMetadata = encrypt("AES-CTR", nodeKey, iv, JSON.stringify(metaData));

    // Compute Encrypted Node Key
    const encryptedNodeKey = encrypt("AES-CTR", localStorage.masterKey, iv, nodeKey);

    // Compute Parent Encrypted Key
    //const parentEncryptedKey = encrypt("AES-CTR", parentFolderKey, nodeKey, iv);
    const parentEncryptedKey = "abc";

    // Submitting file data to the API
    const fileResponse = await request("POST", `${publicRuntimeConfig.apiUrl}/file-system/file`, {
        ref: ref,
        iv: forge.util.bytesToHex(iv),
        tag: tag,
        encryptedNodeKey: encryptedNodeKey,
        parentId: containingFolderID,
        encryptedMetadata: encryptedMetadata,
        parentEncryptedKey: parentEncryptedKey
    });

    return fileResponse.status === "SUCCESS";
}


/**
 * File download client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {Node}        node                File to download
 * @return {Promise<string>}                Download status
 */
export async function downloadFile(node: Node): Promise<string> {
    const {publicRuntimeConfig} = getConfig();

    const response = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${node.id}/content`, {}, {
        "Content-Encoding": "identity"
    }, {
        responseType: "arraybuffer"
    });

    if (!response)
        return "ERROR_FETCH";

    const decrypted = decryptBuffer(
        Buffer.from(response as unknown as string, "binary"),
        node.nodeKey,
        forge.util.hexToBytes(node.iv),
        forge.util.hexToBytes(node.tag));

    if (!decrypted)
        return "ERROR_DECRYPT";

    // FIXME Refactor client download
    const blob = new File([decrypted], node.metaData.name);
    let test = document.createElement("a");
    // @ts-ignore
    test.href = window.URL.createObjectURL(blob);
    test.download = node.metaData.name;
    test.click();

    return "SUCCESS";
}


/**
 * Folder creation client-side process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {string}      name                Name of the folder.
 * @param {number}      containingFolderID  ID of the containing folder.
 * @param {Hex}         parentFolderKey     Parent folder's key.
 * @return {boolean}                        (Temporary) True if upload is successful, false otherwise
 */
export async function createFolder(
    name: string,
    containingFolderID: number,
    parentFolderKey: Hex,
): Promise<boolean> {

    const {publicRuntimeConfig} = getConfig();

    // Generate Node Key (256 bits)
    const nodeKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate initialization vector (128 bits)
    const iv = forge.random.getBytesSync(16);

    // Computing encrypted metadata
    const encryptedMetadata = encrypt("AES-CTR", nodeKey, iv, JSON.stringify({
        name: name
    }));

    // Compute Encrypted Node Key
    const encryptedNodeKey = encrypt("AES-CTR", localStorage.masterKey, iv, nodeKey);

    const response = await request("POST", `${publicRuntimeConfig.apiUrl}/file-system/folder`, {
        iv: forge.util.bytesToHex(iv),
        tag: "",
        encryptedNodeKey: encryptedNodeKey,
        encryptedMetadata: encryptedMetadata,
        parentEncryptedKey: "abc",
        parentId: containingFolderID
    });

    return response.status === "SUCCESS";
}


/**
 * Node sharing by link process
 * @see https://docs.google.com/document/d/1bid3hIqrj6cgmGY5IoCocDCYNTaqBXG9GW-ERx4-P5I/edit
 *
 * @param {Node}            node            Node to share.
 * @return {string | null}                  Share Link path, or null if request failed
 */
export async function createNodeShareLink(node: Node): Promise<ShareLink | null> {
    const {publicRuntimeConfig} = getConfig();

    // Generate Share Key (256 bits)
    const shareKey = forge.util.bytesToHex(forge.random.getBytesSync(32));

    // Generate initialization vector (128 bits)
    const iv = forge.random.getBytesSync(16);

    // Generate Encrypted Keys
    const encryptedNodeKey = encrypt("AES-CTR", shareKey, iv, node.nodeKey);
    const encryptedShareKey = encrypt("AES-CTR",
        localStorage.getItem("masterKey") || "", iv, node.nodeKey);

    const response = await request("POST", `${publicRuntimeConfig.apiUrl}/links`, {
        nodeId: node.id,
        iv: forge.util.bytesToHex(iv),
        encryptedNodeKey: encryptedNodeKey,
        encryptedShareKey: encryptedShareKey
    });

    if (response.status !== "SUCCESS")
        return null;

    return {
        shareId: response.data.shareId,
        iv: forge.util.bytesToHex(iv),
        encryptedNodeKey: encryptedNodeKey,
        encryptedShareKey: encryptedShareKey
    }
}


/**
 * Decrypts the file system
 *
 * @param {EncryptedNode}   filesystem      File system to decrypted
 * @return {Node | null}                    Decrypted file system
 */
export function decryptFileSystem(filesystem: EncryptedNode): Node | null {

    const decryptNode = (encryptedNode: EncryptedNode, masterKey: Hex): Node => {
        const iv = forge.util.hexToBytes(encryptedNode.iv);
        const nodeKey = decrypt("AES-CTR", masterKey, iv, encryptedNode.encryptedNodeKey);
        return {
            id: encryptedNode.id,
            children: [],
            iv: encryptedNode.iv,
            tag: encryptedNode.tag,
            nodeKey: nodeKey,
            parentKey: "", //decrypt("AES-CTR", nodeKey, iv, encryptedNode.parentEncryptedKey),
            metaData: JSON.parse(decrypt("AES-CTR", nodeKey, iv, encryptedNode.encryptedMetadata)),
            ref: encryptedNode.ref,
            type: encryptedNode.type
        }
    }

    // TODO decrypt multiple depth

    let decryptedFilesystem: Node = {
        id: filesystem.id,
        iv: "",
        tag: "",
        nodeKey: "",
        metaData: {name: "root"},
        type: "FOLDER",
        ref: "",
        parentKey: "",
        children: []
    };

    for (const encryptedChild of filesystem.children) {
        try {
            // TODO Check node ownership
            decryptedFilesystem.children.push(decryptNode(
                encryptedChild, localStorage.getItem("masterKey") || ""
            ));
        } catch (_) {
            console.warn(`Could not decrypt node ${encryptedChild.id}. Not owner ?`);
        }
    }
    return decryptedFilesystem;
}


/**
 * Validates user's session and extends its validity.
 *
 * @param {Session}     session         Session to validate.
 * @param {string}      apiUrl          API URL.
 * @return {number}                     New session expiration timestamp if validation is successful, -1 otherwise
 */
export async function validateExtendSession(session: Session, apiUrl: string): Promise<number> {

    // Session not set
    if (!session.id || !session.exp)
        return -1;

    // Session expired
    if (Date.now() > session.exp)
        return -1;

    // FIXME Use request() function instead of fetch
    const response = await fetch(`${apiUrl}/users/session/extend`, {
        method: "POST", headers: {"Authorization": `Bearer ${session.id}`}
    });
    const parsed: APIResponse = await response.json();

    // Session invalidated by API
    if (parsed.status !== "SUCCESS")
        return -1;

    // Update session cookie
    setCookies("session", {
        id: session.id,
        exp: parsed.data.expire,
    }, {
        sameSite: true,
        secure: true
    });
    return parsed.data.expire;
}


/**
 * Logs out the user.
 */
export async function terminateSession(): Promise<boolean> {
    const {publicRuntimeConfig} = getConfig();

    // API Call for session termination
    const response = await request("POST", `${publicRuntimeConfig.apiUrl}/users/logout`, {});

    // Clearing cookies and session storage
    removeCookies("session");
    localStorage.clear();

    return response.status === "SUCCESS";
}

/**
 * Deletes a user account.
 *
 * @param {string}      username        Account's username.
 * @return {string}                     Deletion status.
 */
export async function deleteAccount(username: string) {
    const {publicRuntimeConfig} = getConfig();
    const response = await request("DELETE", `${publicRuntimeConfig.apiUrl}/users/${username}`, {});
    return response.status;
}

/**
 * Updates a user account.
 *
 * @param {User}                user
 * @param {string}              firstName
 * @param {string}              lastName
 * @param {string}              email
 * @param {string}              group
 * @param {string}              job
 * @param {UserAccessLevel}     accessLevel
 */
export async function updateAccount(
    user: User,
    firstName?: string,
    lastName?: string,
    email?: string,
    group?: string,
    job?: string,
    accessLevel?: UserAccessLevel
): Promise<string> {
    const {publicRuntimeConfig} = getConfig();

    const response = await request("PATCH", `${publicRuntimeConfig.apiUrl}/users/${user.username}`, {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        group: group || user.group,
        job: job || user.job,
        accessLevel: accessLevel || user.accessLevel
    });

    return response.status;
}
