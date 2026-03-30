import {reactive} from "vue"

export const userStore = reactive({

    id: 1,
    username:"NicoTOpenTheBox",
    profileImage:null,
    hasEmailVerified: true,
    email: "Nicotrem2004@hotmail.com",
    nextBoxDate: new Date(Date.now() + 20 * 1000)


})