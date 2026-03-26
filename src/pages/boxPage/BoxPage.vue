<template>
  <div class="content-container">
      <h1 class="title-h1"> Connect </h1>
    <p>Test pour savoir si la font arrive à se mettre</p>
  </div>
</template>

<script setup>
import gsap from "gsap"
import {onMounted, onUnmounted, ref} from "vue";

onMounted(() => {
  gsap.fromTo(".title-h1", {
    opacity: 0,
    y: -20
  },{
    y: 0,
    opacity: 3,
    duration: 1,
    ease: "power3.out"
  })
})

</script>

<style scoped>
.title-h1 {

  justify-content: center;

}
</style>