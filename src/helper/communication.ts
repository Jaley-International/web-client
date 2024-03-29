import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";
import {getCookie} from "cookies-next";

export enum Status {
    SUCCESS = "SUCCESS",
    ERROR_UNKNOWN = "ERROR_UNKNOWN",
    ERROR_INVALID_ACCESS_LEVEL = "ERROR_INVALID_ACCESS_LEVEL",
    ERROR_FETCH = "ERROR_FETCH",
    ERROR_DECRYPT = "ERROR_DECRYPT",
    ERROR_USERNAME_ALREADY_USED = "ERROR_USERNAME_ALREADY_USED",
    ERROR_EMAIL_ALREADY_USED = "ERROR_EMAIL_ALREADY_USED",
    ERROR_INVALID_REGISTER_KEY = "ERROR_INVALID_REGISTER_KEY"
}

export interface APIResponse {
    status: Status;
    verbose: string;
    data?: any;
}


/**
 * Makes an HTTP request to the API
 * @param {Method}              method              HTTP request method.
 * @param {string}              url                 API URL.
 * @param {object}              data                Request body as an object.
 * @param {AxiosRequestHeaders} additionalHeaders   Additional headers to send.
 * @param {AxiosRequestConfig}  additionalOptions   Additional axios config.
 * @return {Promise<APIResponse>}
 */
export async function request(method: Method, url: string, data: object, additionalHeaders?: AxiosRequestHeaders, additionalOptions?: AxiosRequestConfig): Promise<APIResponse> {

    const sessionJSON = getCookie("session");
    let sessionId: string;
    if (typeof sessionJSON === "string")
        sessionId = JSON.parse(sessionJSON).id;

    return new Promise<APIResponse>(async (resolve) => {
        await axios.request({
            method: method,
            url: url,
            data: data,
            headers: {
                "Authorization": "Bearer " + sessionId || "",
                ...additionalHeaders
            },
            ...additionalOptions
        }).then(response => {
            if (response.data)
                resolve(response.data);
            else
                resolve({
                    status: Status.SUCCESS,
                    verbose: "",
                    data: response
                })
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
                    status: Status.ERROR_UNKNOWN,
                    verbose: reason.request.response,
                    data: {}
                });
            }
        });
    });
}
