<template>
  <div class="page">

    <Box :state="state"></Box>

    <div class="content-container">
      <h1 class="title">{{ titleText }}</h1>
      <div v-if="state !== 1" :class="['button-container', isActive ? 'active' : 'disabled']"
      >
        <button @click="openBox" :disabled="state === 2" class="button-open">
          Open the box
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, render, computed} from "vue"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import Box from "./components/3dEngine.vue";

// Valeur initiale selon la date de la boite
const state = ref(1);// 0=closed 1=isRevealing 2=open (Au yeux de la bd, isRevealing n'existe pas. Lors de l'ouverture, il passe directement à open avec generated content
const isActive = computed(() => state.value !== 2)
const titleText = ref("Error");
let split;



const reveal = () => {}
const finishOpening = () => {}
const reset = () => {}
const showOpen = () => {

  titleText.value = "Your next box is in XX:XX:XX";

}
const showClose = () => {

  titleText.value = "Maybe the next box is the good one";

}


const openBox = () => {

  gsap.to(".button-container", {
    opacity: 0,
    duration: 2,
    ease: "back.inOut",
  })

  gsap.to(".title", {

    opacity: 0,
    duration: 3,
    ease: "back.inOut",
  })
  state.value = 2
}

const closeBox = () => {
  open.value = !open.value
}

onMounted(() => {
  split = SplitText.create(".title", { type: "chars" })

  gsap.to(split.chars, {
    keyframes: [
      { color: "#32cfff" },
      { color: "#7a5cff" },
      { color: "#ff4fd8" },
      { color: "#7dffcf" },
      { color: "#ffd84d" },
      { color: "#32cfff" },
    ],
    duration: 5,
    stagger: 0.1,
    repeat: -1,
    ease: "none",
  })


  gsap.to(".title", {
    opacity: 1,
    duration: 2,
  })


  state.value ? showOpen() : showClose();

})

onUnmounted(() => {split?.revert()})
</script>

<style scoped>
.page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #0d0d14;
}

.content-container {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  pointer-events: none;
}

.title {
  opacity: 0;
  margin: 0;
  color: #32cfff;
  font-size: 50px;
  text-align: center;
  pointer-events: none;
  user-select: none;
}


.button-open {
  font-size: 1.4em;
  padding: 0.6em 0.8em;
  border-radius: 0.5em;
  border: none;
  background-color: #000;
  color: #fff;
  box-shadow: 2px 2px 3px #000000b4;
  z-index: 100;
  pointer-events: auto;
  cursor: inherit;

}

.button-container {
  position: relative;
  padding: 3px;
  background: linear-gradient(90deg, #03a9f4, #f441a5);
  border-radius: 0.9em;
  transition: all 0.4s ease;
  z-index: 10;
}

.button-container.active {
  cursor: pointer;
}

.active::before {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  border-radius: 0.9em;
  z-index: -10;
  filter: blur(0);
  transition: filter 0.4s ease;
}

.active:hover::before {
  background: linear-gradient(90deg, #03a9f4, #f441a5);
  filter: blur(1.2em);
}
.active:active::before {
  filter: blur(0.2em);
}

</style>