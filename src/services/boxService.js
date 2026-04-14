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
    /*
    return {

        boxId: "52562-f636f36-g43763732",
        expires: new Date(Date.now() + 20 * 1000),
        items: [
            {

                boxItemId: "h55742-f6fhrtf6-gg47jg62",
                slotIndex: 4,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",
                rarity: "rare",
                unitPrice: 15.62

            },
            {

                boxItemId: "74e42-f6gf6-gg47jg62",
                slotIndex: 1,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",
                rarity: "legendary",
                unitPrice: 15.62

            },
            {

                boxItemId: "7j7982-hg6-gnhdg2",
                slotIndex: 3,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",
                rarity: "epic",
                unitPrice: 15.62

            },
            {

                boxItemId: "7547g-f4t4hfbedw-g64g4gsbyh",
                slotIndex: 2,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",
                rarity: "epic",
                unitPrice: 15.62

            },
            {

                boxItemId: "37hvc-636gd-3637gf2-254325",
                slotIndex: 0,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",
                rarity: "unique",
                unitPrice: 15.62

            }

        ]

    };

    */



}


export const openBox = async (userId) => {



    // Envoyer la requête. Code d'erreur si pas assez attendu (403 forbidden)
    // Si temps correct, on renvoit à peu-près le même payload que getLatestActiveBox


    const json = await postJson(`${BASIC_URL_BOX}/openBox`, {
        userId:userId
    });
    console.log(json);



}