<template>
  <div class="page">

    <Box v-model:state="state"></Box>

    <div class="content-container">
      <h1 v-if="state !== 1" ref="title" class="title">Your next box is ready</h1>
      <div class="time-div" v-else>
        <h1 ref="title" class="title">The next box is in : </h1>
        <h1 class="time-title">{{counterText}}</h1>
      </div>
      <div v-if="buttonVisible" :class="['button-container', isActive ? 'active' : 'disabled']"
      >
        <button @click="reveal" :disabled="state === 2" class="button-open">
          Open the box
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed, nextTick} from "vue"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import Box from "./components/3dEngine.vue";
import {userStore} from "../../stores/userStore";

// Valeur initiale selon la date de la boite
const state = ref(0);// 0=closed 1=isRevealing 2=open (Au yeux de la bd, isRevealing n'existe pas. Lors de l'ouverture, il passe directement à open avec generated content
const isActive = computed(() => state.value === 0)
const buttonVisible = ref(false);
const counterText = ref("");
const title = ref(null);
let split;


const finishOpening = async () => {

  state.value = 1;

  await nextTick();

  startCounter();

  spawnBoxTimeTitle();

  await createLegendaryText();


}
const reset = async () => {

  state.value = 0;

  await nextTick();

  gsap.to(".time-title", {
    opacity: 0,
    duration: 2,
  })


  gsap.to(title.value,{
    opacity: 1,
    duration: 2,
    delay:2,
  })

  await createLegendaryText();



  setTimeout(async () => {
    buttonVisible.value = true

    await nextTick();

    gsap.to(".button-container",{
      opacity: 1,
      duration: 2,
      ease: "back.inOut",
      onComplete: () => {
      }
    })
  }, 2000)


}
let intervalId = null

const startCounter = () => {


  const updateCountdown = () => {
    const remaining = userStore.nextBoxDate.getTime() - Date.now()

    if (remaining <= 0) {
      counterText.value = "END"
      clearInterval(intervalId)
      intervalId = null
      reset();
      return
    }

    counterText.value = `${formatTime(remaining)}`
  }

  updateCountdown()
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(updateCountdown, 1000)

}


function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

const showOpen = () => {

  startCounter();
  spawnBoxTimeTitle();
  createLegendaryText();


}
const showClose = () => {

  gsap.to(title.value, {
    opacity: 1,
    duration: 2,
  })
  gsap.to(".button-container", {
    opacity: 1,
    duration: 2,
  })
  createLegendaryText();
}


const reveal = () => {

  state.value = 2
  userStore.nextBoxDate = new Date(Date.now() + 20 * 1000)
  gsap.to(".button-container", {
    opacity: 0,
    duration: 2,
    ease: "back.inOut",
    onComplete: () => {
      buttonVisible.value = false;
    }
  })

  gsap.to(title.value, {

    opacity: 0,
    duration: 3,
    ease: "back.inOut",
  })

  setTimeout(() => {
    finishOpening()
  },12000)

}

const createLegendaryText = async () => {

  split?.revert()

  await nextTick()

  split = SplitText.create(title.value, { type: "words" })

  gsap.to(split.words, {
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

}

const spawnBoxTimeTitle = () => {

  gsap.to(title.value, {
    opacity: 1,
    duration: 2,
  })

  createLegendaryText();

  gsap.to(".time-title", {
    opacity: 1,
    duration: 2,
  })

}

onMounted(async () => {

  buttonVisible.value = state.value === 0;

  await nextTick()

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

.time-title {
  opacity: 0;
  margin: 0;
  color: #ff0000;
  font-size: 50px;
  text-align: center;
  pointer-events: none;
  user-select: none;
}

.time-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  opacity: 0;
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