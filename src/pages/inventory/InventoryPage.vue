<template>
  <div class="content-container center-items" >

    <h1 class="page-title">Your inventory</h1>

    <h2 class="subtitle"> {{ 'You have discovered ' +  discoveredItem.length + " item" + (discoveredItem.length > 1 ? 's' : '') + " on " + items.length }}</h2>

    <div class="grid">

      <InventoryCard class="card" :state="getState(item)" :item="item" v-for="item in items" key="{item.id}"/>


    </div>


  </div>
</template>

<script setup>

//get des services tous les items
//get

import InventoryCard from "./components/InventoryCard.vue";
import gsap from "gsap";
import {onMounted} from "vue";


let broughtItems = [

  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 123,
    rarety:"common",

  },
  {
    title:"Un deuxième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 188,
    rarety:"uncommon",

  },
  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 1,
    rarety:"rare",

  },
  {
    title:"Un quatrième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 7737,
    rarety:"legendary",

  },
  {
    title:"Un cinquième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 12345,
    rarety:"unique",

  }
]

let discoveredItem = [

  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 123,

  },
  {
    title:"Un troisième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 96,
    rarety:"epic",

  },
]
let items = [

  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 123,
    rarety:"common",

  },
  {
    title:"Un deuxième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 188,
    rarety:"uncommon",

  },
  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 1,
    rarety:"rare",

  },
  {
    title:"Un troisième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 96,
    rarety:"epic",

  },
  {
    title:"Un quatrième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 7737,
    rarety:"legendary",

  },
  {
    title:"Un cinquième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 12345,
    rarety:"unique",

  },
  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 12300,
    rarety:"common",

  },
  {
    title:"Un deuxième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 18800,
    rarety:"common",

  },
  {
    title:"Corsair V32 Adventure edition Zephyr k23",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 100,
    rarety:"common",

  },
  {
    title:"Un troisième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 9600,
    rarety:"common",

  },
  {
    title:"Un quatrième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 773700,
    rarety:"common",

  },
  {
    title:"Un cinquième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 1234500,
    rarety:"common",

  },
  {
    title:"Un troisième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 91,
    rarety:"common",

  },
  {
    title:"Un quatrième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 71,
    rarety:"common",

  },
  {
    title:"Le dernier item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 12345000,
    rarety:"common",

  }

]


onMounted(() => {

  gsap.to(".card", {

    opacity: 1,
    scale: 1,
    duration:2,
    stagger:0.1,

  })







})



const getState = (item) => {

  if (broughtItems.map((item) => {return item.id}).includes(item.id)) {

    return "brought"
  }
  else if (discoveredItem.map((item) => {return item.id}).includes(item.id)) {

    return "discovered"

  }
  else {

    return "unknown"

  }


}

</script>

<style scoped>

.subtitle {

  margin: 20px;
  font-weight: bold;
  color: var(--couleur-accent);
  font-size: 40px;

}
.center-items {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;

}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  gap: 30px 20px;
  width: 100%;
}

.content-container {
  padding: 20px 0px 800px 0px;
}

.card { opacity: 0; scale:0;}
</style>