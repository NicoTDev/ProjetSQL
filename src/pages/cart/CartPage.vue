<template>

  <div class="content-container container">


    <h1 ref="title" class="page-title"> My cart </h1>

    <div class="div-wrapper" ref="itemRef" v-for="item in order" :key="item.id">
      <OrderViewItem :item="item"></OrderViewItem>
    </div>


    <div class="total-div">


      <p  class="subtitle price-wrapper"> Subtotal : {{subtotal.toFixed(2)}}$</p>
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
import {ref, onMounted, computed, nextTick} from "vue";
import {userStore} from "../../stores/userStore";
import {getActiveOrderByUserId} from "../../services/orderService";
const order = ref(null);
const title = ref(null);
const itemRef = ref(null);
const subtotal = computed(() => (order.value?.items ?? []).reduce((acc, item) => acc + Number(Number(item.lockedPrice) || 0), 0));

const buttonOrder = ref(null);





onMounted(async () => {


  const res = await getActiveOrderByUserId(userStore.id);
  order.value = res.data

  await nextTick();

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


  const tl = gsap.timeline({ paused: true })
    .to(buttonOrder.value, {
      letterSpacing:"0.05rem",
      scale:1.1,
      duration: 0.2,
      ease:"back.inOut" });

  buttonOrder.value.addEventListener("mouseenter", () => tl.play());
  buttonOrder.value.addEventListener("mouseleave", () => tl.reverse());



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