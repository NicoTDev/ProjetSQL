<template>
  <div class="page">

    <div ref="threeBg" class="three-bg"></div>

    <div class="content-container items-center">
      <h1 class="legendary-text">Maybe the next box is the good one</h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue"
import * as THREE from "three"
import gsap from "gsap"
import {SplitText} from "gsap/SplitText";



const threeBg = ref(null)

let scene = null
let camera = null
let renderer = null
let animationId = null
let cube = null

onMounted(() => {

  //faire l'animation
  const split = SplitText.create(".legendary-text", { type: "chars" })

  const chars = split.chars;


  // 🌈 GRADIENT QUI BOUGE
  gsap.to(chars, {
    backgroundPosition: "200% 50%",
    duration: 3,
    ease: "linear",
    repeat: -1,
    stagger: 0.03
  })

  // ✨ GLOW QUI RESPIRE
  gsap.to(chars, {
    keyframes: [
      { color: "#ff4fd8" },
      { color: "#7a5cff" },
      { color: "#32cfff" },
      { color: "#7dffcf" },
      { color: "#ffd84d" },
      { color: "#ff4fd8" } // ⚠️ même que début
    ],
    duration: 5,
    stagger: 0.1,
    repeat: -1,
    repeatDelay: 0,
    ease: "none",
  })


  const container = threeBg.value
  if (!container) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  })

  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    cube.rotation.x += 0.005
    cube.rotation.y += 0.008

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener("resize", handleResize)
})

const handleResize = () => {
  if (!camera || !renderer) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #111;
}

.three-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.legendary-text {
  margin-top: 100px;
  color: #ff4fd8;
}

.items-center {
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>