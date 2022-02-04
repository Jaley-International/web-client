import axios, {Method} from "axios";

export interface APIResponse {
    status: string;
    verbose: string;
    data?: any;
}

/**
 * Makes an HTTP request to the API
 * @param {Method}      method          HTTP request method.
 * @param {string}      url             API URL.
 * @param {object}      data            Request body as an object.
 * @return {Promise<APIResponse>}
 */
export async function request(method: Method, url: string, data: object): Promise<APIResponse> {
    return new Promise<APIResponse>(async (resolve) => {
        await axios.request({
            method: method,
            url: url,
            data: data,
            headers: {
                "Access-Control-Allow-Origin": url
            }
        }).then(response => {
            resolve(response.data);
        }).catch(reason => {
            try {
                const response = JSON.parse(reason.request.response);
                resolve({
                    status: response.status,
                    verbose: response.verbose,
                    data: {}
                });
            } catch (_) {
                resolve({
                    status: "ERROR_UNKNOWN",
                    verbose: reason.request.response,
                    data: {}
                });
            }
        });
    });
}
