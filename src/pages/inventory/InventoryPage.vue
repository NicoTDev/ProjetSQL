<template>
  <h1 v-if="isLoading"></h1>
  <div v-else class="content-container center-items" >

    <h1 class="page-title">Your inventory</h1>

    <h2 class="subtitle"> {{ 'You have discovered ' +  discoveredItems.length + " item" + (discoveredItems.length > 1 ? 's' : '') + " on " + items.length }}</h2>

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
import {nextTick, onMounted, ref} from "vue";
import {getItemCollection} from "../../services/itemService";
import {userStore} from "../../stores/userStore";

const isLoading = ref(true);
let items = ref([]);
let boughtItems = ref([]);
let discoveredItems = ref([]);

onMounted(async () => {


  try {

    const res = await getItemCollection(userStore.id);
    discoveredItems.value = res.discover;
    boughtItems.value = res.bought;

    items.value = [...boughtItems.value,...discoveredItems.value,...res.notDiscover];


  } catch(err) {}
  finally {

    isLoading.value = false;

    await nextTick();

    gsap.to(".card", {

      opacity: 1,
      scale: 1,
      duration:2,
      stagger:0.1,

    })

  }









})



const getState = (item) => {

  if (boughtItems.value.map((item) => {return item.id}).includes(item.id)) {

    return "brought"
  }
  else if (discoveredItems.value.map((item) => {return item.id}).includes(item.id)) {

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