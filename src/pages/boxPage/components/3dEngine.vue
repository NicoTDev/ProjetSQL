<template>
  <div ref="bg" class="box-frame"></div>
</template>

<script setup>
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { onMounted, onUnmounted, ref, watch } from "vue"
import gsap from "gsap"
import { BoxModel } from "./BoxModel"
import { CardModel } from "./CardModel"

const props = defineProps({
  state: Number,
})

const bg = ref(null)
const box = new BoxModel()

const cards = [];
let boxScene = null
let uiScene = null
let boxCamera = null
let uiCamera = null
let renderer = null
let controls = null
let raf = null


const resize = () => {
  if (!boxCamera || !uiCamera || !renderer) return

  const width = window.innerWidth
  const height = window.innerHeight

  // caméra 3D monde
  boxCamera.aspect = width / height
  boxCamera.updateProjectionMatrix()

  // caméra UI orthographique
  uiCamera.left = width / -2
  uiCamera.right = width / 2
  uiCamera.top = height / 2
  uiCamera.bottom = height / -2
  uiCamera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const showOpen = () => {
  // La boite apparait ouverte, les cartes apparaissent l'une après l'autre et il y a un compteur au lieu des boutons
  box.setOpen();

  // On get les 5 cartes et on les fait spawn
  // Cartes UI

  const cardsAPI = [
    {title:"CASQUETTE CIELE 2020 ADVENTURE EDITION",
     rarety:"EPIC",
     price:"30.20$",
      imageURL:"public/icons/casquette.png"
    },
    {title:"Une autre casquette de test",
      rarety:"RARE",
      price:"1.20$",
      imageURL:"public/icons/casquette.png"
    },
    {title:"Une salobrinbanteQuiNousDitOui",
      rarety:"UNIQUE",
      price:"99.99$",
      imageURL:"public/icons/casquette.png"
    },
    {title:"Test 1",
      rarety:"UNCOMMON",
      price:"10.99$",
      imageURL:"public/icons/casquette.png"
    },
    {title:"item",
      rarety:"LEGENDARY",
      price:"30.20$",
      imageURL:"public/icons/casquette.png"
    }
  ]

  let posX = -500;
  box.getChest().scale.set(0,0,0)
  gsap.to(box.getChest().scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: "back.out(1.7)"
  })
  for (let card of cardsAPI) {

    const canvas = document.createElement("canvas")
    const card1 = new CardModel(canvas, card.title, card.rarety, card.imageURL, card.price).getModel()
    card1.position.set(posX, 140, 0)
    posX += 250;
    card1.scale.set(0, 0, 0)
    cards.push(card1)
    uiScene.add(card1)
    gsap.to(card1.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: "back.out(1.7)"
    })

  }

}

const showClosed = () => {
  // La boite apparait fermée, aucune carte et les boutons de base
}

const reset = () => {
  box.close()
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
    ease: "power2.inOut",
  })

  gsap.to(controls.target, {
    x: 0,
    y: 0.5,
    z: 0,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => controls.update(),
  })
}

const finishOpening = () => {
  console.log("finishOpening")
}

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  // Scene monde
  boxScene = new THREE.Scene()
  boxScene.background = new THREE.Color(0x0d0d14)

  // Scene UI
  uiScene = new THREE.Scene()

  const uiAmbient = new THREE.AmbientLight(0xffffff, 1.5)
  uiScene.add(uiAmbient)

  // Caméra monde
  boxCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  boxCamera.position.set(2.7, 2.1, 2.8)

  // Caméra UI
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

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.autoClear = false

  bg.value.appendChild(renderer.domElement)

  // Controls
  controls = new OrbitControls(boxCamera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false
  controls.target.set(0, 0.32, 0)
  controls.minPolarAngle = 0.75
  controls.maxPolarAngle = 1.45
  controls.update()

  // Lumières
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

  // Modèle coffre
  boxScene.add(box.getChest())

  // État initial
  props.state ? showOpen() : showClosed()

  // Resize
  window.addEventListener("resize", resize)

  // Loop
  const loop = () => {
    raf = requestAnimationFrame(loop)

    const t = performance.now() * 0.001
    box.getChest().rotation.y = Math.sin(t * 0.55) * 0.08


    cards.forEach((card, index) => {

      const floatSpeed = 1.2 + index * 0.25
      const floatAmplitude = 12 + index * 4
      const baseY = index === 0 ? 140 : 100
      const offset = index * 1.4

      card.position.y = baseY + Math.sin(t * floatSpeed + offset) * floatAmplitude
    })


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
  () => props.state,
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