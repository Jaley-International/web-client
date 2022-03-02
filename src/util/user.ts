import {request} from "../helper/communication";
import getConfig from "next/config";
import User from "../model/User";

/**
 * Returns the list of already existing groups and jobs
 */
export async function getGroupsJobsSuggestions(): Promise<string[][]> {

    const {publicRuntimeConfig} = getConfig();

    const usersListResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/users`, {});
    if (usersListResponse.status !== "SUCCESS")
        return [[], []];

    const users = usersListResponse.data.users;
    const groups = users.map((user: User) => user.group);
    const jobs = users.map((user: User) => user.job);

    return [
        groups.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index),
        jobs.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
    ]
}
