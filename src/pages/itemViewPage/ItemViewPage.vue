<template>
  <h1 v-if="loading">Loading...</h1>
  <div v-else :style="`background: ${getStyle(item.rarity).background}`" class="main-background">


    <div class="content-container page-flex-alignment">


      <h1 ref='title' :style="`color:${getStyle(item.rarity).color}`" class="page-title"> {{ item.name }} </h1>

      <img ref='image' :style="`box-shadow: 0 0 0 4px ${getStyle(item.rarity).color},
      0 0 15px ${getStyle(item.rarity).color}, 0 0 30px ${getStyle(item.rarity).color};`"
           class="image" :src="item.imageUrl"/>


      <p class="description"> {{item.description}}</p>


      <div v-if="item.isAvailable" class="cart-div">


        <button ref="button" class="default-buy-button"> Add to cart </button>

        <p :style="`color:${getStyle(item.rarity).color}`" class="price" ref="price"> {{item.unitPrice}}$</p>

      </div>
      <div v-else-if="item.isAvailable" class="cart-div">


        <p :style="`color:${getStyle(item.rarity).color}`" class="price" ref="price"> {{item.unitPrice}}$</p>

      </div>

    </div>

  </div>
</template>

<script setup>

//Appelle API qui utilise le slug dans l'url pour rechercher avec un service dans la bd, un item possédant ce slug
//Avant on vérifie si l'item est dans la base de données de l'utilisateur
import {useRoute} from "vue-router";
import gsap from "gsap";
import {nextTick, onMounted, ref} from "vue";
import {getItemBySlug} from "../../services/itemService";

const route = useRoute();
const price = ref(null);
const title = ref(null);
const image = ref(null);
const button = ref(null);
const loading = ref(true);
//const item = route.params.slug;
//fake item
/*
const item = {

  title: "Ceci est un vrai item",
  description: "Ceci est vraiment un item, il sera disponible lors du lancement de l'application et permettra de savoir" +
    "si des personnes sont mal intentionnées. Il sera indisponible à moins que des données soient manipulées. L'obtention de cet" +
    "item déclenchera immédiatement une enquête concernant l'intégrité du compte. Si, par malchance, vous tombez sur cet item, veuillez au plus" +
    "vite alerter un membre du support pour prouver votre intégrité et prévenir un bannissement.",
  price: 30.56,
  rarity: "unique",
  image: "https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg"


}

*/
const item = ref(null);

const getStyle = (rarity) => {
  switch (rarity) {
    case "common":return {background:"#000000",color:"#bebebe", brightColor:"#ffffff"}
    case "uncommon":return {background:"#000000",color:"#14a401", brightColor:"#00ff0e"}
    case "rare":return {background:"#000000",color:"#006dbd", brightColor:"#039eff"}
    case "epic":return {background:"#000000",color:"#9900a1", brightColor:"#b941ff"}
    case "legendary":return {background:"#000000",color:"#c5b500", brightColor:"#ffed4c"}
    case "unique":return {background:"#000000",color:"#ff0000", brightColor:"#45ff02"}
  }
}

onMounted(async () => {

  try {

    item.value = await getItemBySlug(route.params.slug);


  } finally {

    loading.value = false;

  }
  await nextTick();

  gsap.to(title.value, {

    color: getStyle(item.value.rarity).brightColor,
    repeat:-1,
    yoyo:true,
    duration:1,
    delay:0.5,

  } )

  gsap.to(image.value, {

    boxShadow:`0 0 0 4px ${getStyle(item.value.rarity).brightColor},
               0 0 15px ${getStyle(item.value.rarity).brightColor},
               0 0 30px ${getStyle(item.value.rarity).brightColor}`,
    repeat:-1,
    yoyo:true,
    duration:1,
    delay:0.5,

  } )

  gsap.to(price.value, {

    color: getStyle(item.value.rarity).brightColor,
    repeat:-1,
    yoyo:true,
    duration:1,
    delay:0.5,

  } )


  const tl = gsap.timeline({ paused: true })
    .to(button.value, {
      letterSpacing:"0.05rem",
      scale:1.1,
      duration: 0.2,
      ease:"back.inOut" });

  button.value.addEventListener("mouseenter", () => tl.play());
  button.value.addEventListener("mouseleave", () => tl.reverse());


})



</script>


<style scoped>


.main-background {
  min-height: 100vh;
  width: 100%;
  background: #151515;
  padding: 2rem 1rem 5rem;
  box-sizing: border-box;
}

.page-flex-alignment {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.page-title {
  padding-top: 20px;
  text-align: center;
  font-size: clamp(2rem, 5vw, 4rem);
}

.image {
  width: min(100%, 700px);
  height: auto;
  border-radius: 15px;
  box-shadow: 0 0 0 4px #0d9b00, 0 0 15px #0d9b00, 0 0 30px #0d9b00;
  display: block;
}

.description {
  padding: 1.5rem 0;
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
}

.cart-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.price {
  font-size: clamp(1.4rem, 3vw, 2rem);
  text-align: center;
}
</style>