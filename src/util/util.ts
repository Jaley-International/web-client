/**
 * Generate a random string.
 * WARNING : Not cryptographically secure.
 *
 * @param {number}      length          Length of the random string to generate.
 * @return {string}                     random string under the format : [a-zA-Z0-9]{length}
 */
import forge, {Hex} from "node-forge";

export function randomString(length: number): string {
    let result = "";
    const pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0 ; i < length ; ++i)
        result += pool.charAt(Math.floor(Math.random() * pool.length));
    return result;
}


/**
 * Converts a hexadecimal string to a base64 url encoded string
 */
export function hexToBase64Url(hex: Hex): string {
    return Buffer.from(hex, "hex").toString("base64")
        .replaceAll(/\//g, "-")
        .replaceAll(/\+/g, "_")
        .replaceAll("=", "");
}


/**
 * Converts a base64 url encoded string to a hexadecimal string
 */
export function base64UrlToHex(str: string): Hex {
    str = str.replaceAll(/-/g, "/")
        .replaceAll(/_/g, "+");
    return Buffer.from(str, "base64").toString("hex");
}
