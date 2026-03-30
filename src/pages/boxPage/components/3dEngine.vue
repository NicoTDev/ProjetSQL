<template>
  <div ref="bg" class="box-frame"></div>
</template>

<script setup>
import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue"
import gsap from "gsap"
import {BoxModel} from "./BoxModel"
import {CardModel} from "./CardModel"
import * as ItemStore from "../../../stores/ItemStore"
import { useRouter } from "vue-router"
const state = defineModel("state")

const bg = ref(null)
const box = new BoxModel()

const router = useRouter()

let cards = []
let canvases = []
let boxScene = null
let uiScene = null
let boxCamera = null
let uiCamera = null
let renderer = null
let controls = null
let raf = null

// Raycasting
let raycaster = null
let mouse = null

const resize = () => {
  if (!boxCamera || !uiCamera || !renderer) return

  const width = window.innerWidth
  const height = window.innerHeight

  boxCamera.aspect = width / height
  boxCamera.updateProjectionMatrix()

  uiCamera.left = width / -2
  uiCamera.right = width / 2
  uiCamera.top = height / 2
  uiCamera.bottom = height / -2
  uiCamera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const showOpen = () => {
  box.setOpen()
  summonCards()

  box.getChest().scale.set(0, 0, 0)
  gsap.to(box.getChest().scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: "back.out(1.7)"
  })

  for (let i = 0; i < cards.length; i++) {
    cards[i].position.set(-500 + i * 250, 140, 0)

    gsap.to(cards[i].scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: "back.out(1.7)"
    })
  }
}

const summonCards = () => {
  for (let i = 0; i < ItemStore.cardsAPI.length; i++) {
    const cardAPI = ItemStore.cardsAPI[i]
    const canvas = document.createElement("canvas")

    const card = new CardModel(
      canvas,
      cardAPI.title,
      cardAPI.rarety,
      cardAPI.imageURL,
      cardAPI.price
    ).getModel()

    card.userData = {
      type: "card",
      index: i,
      title: cardAPI.title,
      data: cardAPI
    }

    card.position.set(0, -150, 0)
    card.scale.set(0, 0, 0)

    cards.push(card)
    canvases.push(canvas)
    uiScene.add(card)
  }
}

const destroyCards = async () => {
  for (let card of cards) {
    const randomDelay = Math.random()

    gsap.to(card.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "none",
      delay: randomDelay
    })

    gsap.to(card.position, {
      x: 0,
      y: -150,
      duration: 2,
      ease: "none",
      delay: randomDelay
    })
  }

  await nextTick()

  cards = []
  canvases = []
}

const showClosed = () => {
  // La boite apparait fermée, aucune carte et les boutons de base
}

const reset = () => {
  destroyCards()
  setTimeout(() => box.close(), 3000)

  console.log("reset")
}

const reveal = () => {
  box.open()
  console.log("reveal")

  gsap.to(boxCamera.position, {
    x: 2.5,
    y: 2,
    z: 3.5,
    duration: 2,
    ease: "power2.inOut"
  })

  gsap.to(controls.target, {
    x: 0,
    y: 0.5,
    z: 0,
    duration: 2,
    ease: "power2.inOut"
  })

  summonCards()

  for (let i = 0; i < cards.length; i++) {
    gsap.to(cards[i].scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      delay: 2 + 2 * i
    })

    gsap.to(cards[i].position, {
      x: -500 + i * 250,
      y: 140,
      duration: 2,
      delay: 2 + 2 * i
    })
  }
}

const finishOpening = () => {
  console.log("finishOpening")
}

const onCanvasClick = (event) => {
  if (!renderer || !uiCamera || cards.length === 0 || state.value !== 1) return

  const rect = renderer.domElement.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, uiCamera)

  const intersects = raycaster.intersectObjects(cards, true)

  if (intersects.length === 0) return

  let root = intersects[0].object
  while (root.parent && !cards.includes(root)) {
    root = root.parent
  }

  if (!root || !cards.includes(root)) return


  gsap.to(root.scale, {
    x: 1.3,
    y: 1.3,
    z: 1.3,
    duration: 0.2,
    onComplete: () => {
      router.push(`/item/${root.userData?.title}`)
    }
  });
}

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  boxScene = new THREE.Scene()
  boxScene.background = new THREE.Color(0x0d0d14)

  uiScene = new THREE.Scene()

  const uiAmbient = new THREE.AmbientLight(0xffffff, 1.5)
  uiScene.add(uiAmbient)

  boxCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  boxCamera.position.set(2.7, 2.1, 2.8)

  uiCamera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    0.1,
    1000
  )
  uiCamera.position.set(0, 0, 10)
  uiCamera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.autoClear = false

  bg.value.appendChild(renderer.domElement)

  // Raycaster init
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  controls = new OrbitControls(boxCamera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false
  controls.target.set(0, 0.32, 0)
  controls.minPolarAngle = 0.75
  controls.maxPolarAngle = 1.45
  controls.update()

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
  boxScene.add(ambientLight)

  const rimLight = new THREE.DirectionalLight(0xffffff, 1.2)
  rimLight.position.set(-3, 2, -4)
  boxScene.add(rimLight)

  const mainDirLight = new THREE.DirectionalLight(0xffffff, 2.5)
  mainDirLight.position.set(3, 5, 2)
  mainDirLight.target.position.set(0, 0, 0)
  mainDirLight.castShadow = true
  mainDirLight.shadow.mapSize.width = 1024
  mainDirLight.shadow.mapSize.height = 1024
  mainDirLight.shadow.camera.near = 0.5
  mainDirLight.shadow.camera.far = 15
  mainDirLight.shadow.radius = 4

  boxScene.add(mainDirLight)
  boxScene.add(mainDirLight.target)

  boxScene.add(box.getChest())

  state.value ? showOpen() : showClosed()

  window.addEventListener("resize", resize)
  renderer.domElement.addEventListener("click", onCanvasClick)

  const loop = () => {
    raf = requestAnimationFrame(loop)

    const t = performance.now() * 0.001
    box.getChest().rotation.y = Math.sin(t * 0.55) * 0.08

    if (state.value === 1) {
      cards.forEach((card, index) => {
        const floatSpeed = 1.2 + index * 0.25
        const floatAmplitude = 12 + index * 4
        const baseY = index === 0 ? 140 : 100
        const offset = index * 1.4

        card.position.y = baseY + Math.sin(t * floatSpeed + offset) * floatAmplitude
      })
    }

    controls.update()

    renderer.clear()
    renderer.render(boxScene, boxCamera)
    renderer.clearDepth()
    renderer.render(uiScene, uiCamera)
  }

  loop()
})

onUnmounted(() => {
  window.removeEventListener("resize", resize)

  if (renderer?.domElement) {
    renderer.domElement.removeEventListener("click", onCanvasClick)
  }

  if (raf) cancelAnimationFrame(raf)

  if (controls) controls.dispose()

  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
})

watch(
  () => state.value,
  (newValue) => {
    console.log("Watching", newValue)

    switch (newValue) {
      case 0:
        reset()
        break
      case 1:
        finishOpening()
        break
      case 2:
        reveal()
        break
      default:
        console.log("Not supposed to happen")
    }
  }
)
</script>

<style scoped>
.box-frame {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
</style>