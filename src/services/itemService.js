import {BASIC_URL, getJson, putJson, deleteJson, postJson} from "./JSONUtilFunction";
const BASIC_URL_ITEM = `${BASIC_URL}/items`;

export const getItemById = async (indexId) => {


    return {

        slug: "hoodie-bleu-poudre",
        imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
        name: "Hoodie Bleu Poudre",
        description: "Ceci est vraiment un item, il sera disponible lors du lancement de l'application et permettra de savoir",
        rarity: "rare",
        isAvailable: false,
        alreadyInOrder: false,

    }


}

export const getItemBySlug = async (slug) => {

    return {

        itemId: "h55742-f6fhrtf6-gg47jg62",
        imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
        name: "Hoodie Bleu Poudre",
        description: "Ceci est vraiment un item, il sera disponible lors du lancement de l'application et permettra de savoir",
        rarity: "unique",
        isAvailable: true,
        alreadyInOrder: false,
        unitPrice: 15.62

    }



}

