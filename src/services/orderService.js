import {BASIC_URL, getJson, putJson, deleteJson, postJson} from "./JSONUtilFunction";
const BASIC_URL_ORDER = `${BASIC_URL}/orders`;




// Get la commande de quelqu'un
// Ajouter un élément dans la commande de quelqu'un
// Supprimer un élément dans la commande de quelqu'un
// Gérer l'achat de la commande de quelqu'un


export const getActiveOrderByUserId = async (userId)  => {

    //const json = await getJson(`${BASIC_URL_ORDER}/${userId}`);
    //console.log(json);
    return {

        orderId: "52562-f636f36-g43763732",
        totalAmount: 638.43,
        status: "active",
        items: [
            {

                orderItemId: "74e42-f6gf6-gg47jg62",
                unitPrice: 138.20,
                slug: "hoodie-bleu-poudre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Bleu Poudre",

            },
            {

                orderItemId: "6363-g3673g3-76373",
                unitPrice: 190.03,
                slug: "hoodie-rouge-verdatre",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Hoodie Rouge Verdatre",

            },
            {

                orderItemId: "aaaa-66646-b347637",
                unitPrice: 310.20,
                slug: "soulier-bleu-ocean",
                imageUrl: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
                name: "Soulier Bleu Ocean",

            }


        ]

    };

}

export const addOrderItem = (orderId)  => {

    //

}

export const deleteOrderItem = (orderId) => {}


// Spécial
export const buyOrder = (orderId) => {}