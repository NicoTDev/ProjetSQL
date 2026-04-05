<template>

  <div class="content-container container">


    <h1 ref="title" class="page-title"> My cart </h1>

    <div class="div-wrapper" ref="itemRef" v-for="item in items">
      <OrderViewItem :item="item"></OrderViewItem>
    </div>


    <div class="total-div">


      <p  class="subtitle price-wrapper"> Subtotal : {{subtotal}}$</p>
      <p  class="taxes price-wrapper"> Taxes (4.975%) : {{(subtotal * 0.04975).toFixed(2)}}$</p>
      <p  class="taxes price-wrapper"> Taxes (10%) : {{(subtotal * 0.10).toFixed(2)}}$</p>
      <p  class="total price-wrapper"> Total : {{(subtotal*1.14975).toFixed(2)}}$</p>
    </div>


    <button ref="buttonOrder" class="default-buy-button"> Order now </button>




  </div>

</template>

<script setup>

import OrderViewItem from "./components/OrderViewItem.vue";
import gsap from "gsap"
import {ref, onMounted, computed} from "vue";
const title = ref(null);
const itemRef = ref(null)
const subtotal = computed( () => items.map(item => item.prix).reduce((acc, val) => acc+val, 0))
const buttonOrder = ref(null);

let items = [

  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 123,
    rarety:"common",
    prix:20.00

  },
  {
    title:"Un deuxième item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-3.jpg",
    id: 188,
    rarety:"uncommon",
    prix:9.99,

  },
  {
    title:"Un item, Un item, Un item, Un item," +
      "Un item, Un item, Un item, Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 1,
    rarety:"rare",
    prix:119.99,

  },
  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 1,
    rarety:"rare",
    prix:111.9,

  },
  {
    title:"Un item",
    image:"https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg",
    id: 1,
    rarety:"rare",
    prix:119.99,

  }
]

onMounted(() => {


  gsap.fromTo(title.value, {
      opacity:0,
      y:-10
    },
    {
      opacity: 1,
      y:0,
      duration:1,
      ease:"back.inOut",
    });

  gsap.fromTo(itemRef.value, {
      opacity:0,
      y:-10
    },
    {
      opacity: 1,
      y:0,
      duration:1,
      stagger: 0.2,
      ease:"back.inOut",
    });

  gsap.fromTo(".price-wrapper", {
    opacity:0,
    y:-10
  },
    {
      opacity: 1,
      y:0,
      duration:1,
      ease:"back.inOut",
      stagger:0.1
    })


  gsap.fromTo(buttonOrder.value, {
    opacity:0,
    y:-10,
  },
    {
      opacity: 1,
      y:0,
      duration:1,
      delay:1,
      ease:"back.inOut",
    })

})

</script>

<style scoped>
.container {

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-bottom:200px;
}

.button:hover {

  background-color: #07a90c;
  box-shadow: 2px 0 10px #beff73;
  letter-spacing: 0.1rem;

}
.div-wrapper {
  justify-content: center;
  width: 100%;
  display: flex;
}

.subtitle {

  font-size:20px;

}

.taxes {

  font-size: 15px;

}

.total {

  font-size: 30px;
  font-weight: bold;

}
</style>