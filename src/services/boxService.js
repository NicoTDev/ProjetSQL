import {BASIC_URL, getJson, putJson, deleteJson, postJson} from "./JSONUtilFunction";
const BASIC_URL_BOX = `${BASIC_URL}/boxes`;


export const getLatestActiveBoxByUserId = async (userId) => {

    let json
    try {
        json = await getJson(`${BASIC_URL_BOX}/user/${userId}`);

    }
    catch (err) {
        if (err.status === 404) {

            console.log("Aucun usager de connecté")

        }
    }

    return json;

}


export const openBox = async (userId) => {



    // Envoyer la requête. Code d'erreur si pas assez attendu (403 forbidden)
    // Si temps correct, on renvoit à peu-près le même payload que getLatestActiveBox


    const json = await postJson(`${BASIC_URL_BOX}/openBox`, {
        userId:userId
    });

    return json;


}