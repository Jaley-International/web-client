import axios, {Method} from "axios";

export interface APIResponse {
    status: number;
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
            data: data
        }).then(response => {
            resolve({
                status: response.status,
                data: response.data
            });
        }).catch(reason => {
            resolve({
                status: reason.request.status,
                data: {message: reason.request.response}
            });
        });
    });
}
