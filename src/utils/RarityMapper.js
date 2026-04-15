export const getRarityName = (rarityNumber) => {

    switch (rarityNumber) {
        case 1:
            return "common";
        case 2:
            return "uncommon";
        case 3:
            return "rare";
        case 4:
            return "epic";
        case 5:
            return "legendary";
        case 6:
            return "unique";
        default:
            return "Rarity inexistante -> " + rarityNumber;
    }




}