<template>
  <div class="content-container center-items">
    <h1 class="title-h1 text-center page-title "> Auth </h1>
    <login-form class="summonable-forms" v-if="!isCreatingNewAccount">
    </login-form>
    <register-form class="summonable-forms" v-if="isCreatingNewAccount">
    </register-form>


    <h4 class="summonable-forms mt-10">
      {{isCreatingNewAccount ? "Already have an account?" : "New?"}}
      <span @click="switchForms" class="link">
      {{ isCreatingNewAccount ? "Log in" : "Create an account now!"}}
      </span>
    </h4>

    <button class="auth-button summonable-forms" @click="submitForms">
      {{ isCreatingNewAccount ? "Login" : "Register" }}
    </button>

  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import gsap from "gsap";
import { nextTick } from "vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

const isCreatingNewAccount = ref(true);
const submitForms = () => {



}

const switchForms = async () => {

  isCreatingNewAccount.value = !isCreatingNewAccount.value;

  await nextTick();

  summonContent();
  scrambleTitle();
  summonButton();
};

const summonContent = () => {
  gsap.fromTo(".summonable-forms", {
    opacity: 0,
    y: -20,
  },{
    y: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
  })
};

const scrambleTitle = () => {
  //spawn the text on the top
  gsap.to(".title-h1", {
    scrambleText: isCreatingNewAccount.value ? "Register a new account" : "Login into your account",
  })
};

const summonButton = () => {
  //spawn the text on the top
  gsap.fromTo(".auth-button", {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 1,
    scrambleText: isCreatingNewAccount.value ? "Register" : "Login"
  })
};

onMounted(() => {


  summonContent();

  gsap.fromTo(".title-h1", {
    opacity: 0,
    y:-20,
  },
    {
      opacity: 1,
      y:0,
    })

  scrambleTitle();
  gsap.to(".auth-button",
    {
      opacity: 1,
      delay: 1,
    })

})



</script>

<style scoped>

.mt-10 {
  margin-top: 10px;
}

.link {

  color: var(--couleur-accent);
  cursor: pointer;

}

.center-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-h1 {

  color: var(--couleur-accent);
  justify-content: center;

}


.text-center {
  text-align: center;
}


.auth-button {
  opacity: 0;
  margin-top: 20px;
  padding: 20px 40px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  font-size: 15px;
  transition: all 0.5s ease;
}

.auth-button:hover {
  letter-spacing: 3px;
  background-color: var(--couleur-accent);
  color: hsl(0, 0%, 100%);
  box-shadow: var(--couleur-accent) 0px 7px 29px 0px;
}

.auth-button:active {
  letter-spacing: 3px;
  background-color: var(--couleur-accent);
  color: hsl(0, 0%, 100%);
  box-shadow: var(--couleur-accent) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}


/* Child generic style */

.inputbox {

  position: relative;

}

.inputbox input {

  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #23242a;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;

}

.inputbox span {
  position: absolute;
  left: 0;
  padding: 20px 10px 10px;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 00.05em;
  transition: 0.5s;
  pointer-events: none;
}

.inputbox input:valid ~span,
.inputbox input:focus ~span {
  color: #a8a8b5;
  transform: translateX(-10px) translateY(-34px);
  font-size: 0.9em;
}

.inputbox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #b3b2b6;
  border-radius: 4px;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputbox input:valid ~i,
.inputbox input:focus ~i {
  height: 44px;
}

</style>