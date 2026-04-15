import {BASIC_URL, getJson, putJson, deleteJson, postJson} from "./JSONUtilFunction";
import {userStore} from "../stores/userStore";
import {useRouter} from "vue-router";
const BASIC_URL_USER = `${BASIC_URL}/users`;


export const registerUser = async (username, lastName, firstName, email, password) => {



    const json = await postJson(`${BASIC_URL_USER}/register`, {

            username: username,
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,

        });
    return json;



}

export const login = async (identifier, password) => {

    const json = await postJson(`${BASIC_URL_USER}/login`, {

        identifier: identifier,
        password: password,

    });

    return json;

}

export const changeEmail = (newEmail) => {

    return {

        status: 201,
        message: 'Email changed',

    }

}


export const changeUsername = (newUsername) => {

    return {

        status: 201,
        message: 'Username changed',

    }

}

