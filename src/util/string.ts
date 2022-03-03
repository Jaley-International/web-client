import {Hex} from "node-forge";

/**
 * Generate a random string.
 * WARNING : Not cryptographically secure.
 *
 * @param {number}      length          Length of the random string to generate.
 * @return {string}                     random string under the format : [a-zA-Z0-9]{length}
 */
export function randomString(length: number): string {
    let result = "";
    const pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0 ; i < length ; ++i)
        result += pool.charAt(Math.floor(Math.random() * pool.length));
    return result;
}


/**
 * Returns the input string capitalized
 */
export function capitalize(str: string): string {
    if (str.length === 0)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


/**
 * Transform a number of bytes to a more readable format with unit.
 * E.g. 42371 => "42 MB"
 */
export function formatBytes(bytes: number, decimals: number = 0): string {
    if (bytes === 0) return "0 byte";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["bytes", "KiB", "MiB", "GiB", "TiB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
