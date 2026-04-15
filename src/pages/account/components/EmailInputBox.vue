<template>
  <div class="email-div">


    <p class="subtitle"> Email </p>
    <input
      class="email-input default-input"
      type="text"
      v-model="emailInput"
      :readonly="userStore.hasEmailVerified"
    />

    <div v-if="userStore.hasEmailVerified" class="email-modify-button-container">


      <button @click="resetEmail" class="change-email-button"> Change your email</button>

    </div>
    <button  @click="verifyEmail" class="change-email-button verify-button" :disabled="emailSent" v-else > {{ verifyButtonText }}</button>

  </div>
  <p v-if="userStore.hasEmailVerified" class="email-information-text"> If you change your email, you will need to re-verify it</p>
</template>

<script setup>

import {userStore} from "../../../stores/userStore";
import {ref} from "vue";
import gsap from "gsap";
const emailInput = ref(userStore.email || "No email found");
const isDirty = defineModel()
const emailIni = ref("")
const emailSent = ref(false)
const verifyButtonText = ref("Verify your email")

defineExpose({

  getValue: () => emailInput.value

})


const verifyEmail =  () => {

  emailSent.value = true;
  // Send email
  verifyButtonText.value = "Email sent!";
  gsap.to( ".verify-button",{

    backgroundColor: "#67cb00",
    duration: 0.5,

  });





}

const resetEmail = () => {

  isDirty.value = true;
  userStore.hasEmailVerified = false;
  emailIni.value = emailInput.value;

}

</script>

<style scoped>
.change-email-button {

  font-size: 15px;
  padding: 10px 10px;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  background: var(--couleur-accent);
  color: white;
  font-weight: 700;

}
.change-email-button:not(:disabled):hover {
  background: linear-gradient(270deg, var(--couleur-accent), rgb(255, 212, 0));
}

.email-div {

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 60%;

}

.email-information-text {

  font-size: 0.8rem;

}

.email-modify-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.email-input {
  font-size: 20px;
  width: 60%;
}

input[readonly] {
  opacity: 0.7;
  cursor: default;
}

</style>