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
