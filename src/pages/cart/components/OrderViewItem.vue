<template>

  <div class="card-container">

    <img class="card-image" :src="props.item.imageUrl" alt="item Logo"/>

    <p class="card-title"> {{props.item.name}}</p>


    <div class="card-prix-remove-container">

      <p class="card-prix">{{props.item.unitPrice}}$</p>

      <button class="card-remove">Remove</button>

    </div>

  </div>
</template>

<script setup>



const props = defineProps({
  item: {
    type: Object
  },
})


</script>


<style scoped>
.card-container {

  display: grid;
  flex-direction: row;
  width: 50%;
  grid-template-columns: 1fr auto 1fr;
  background: #070707;
  border-radius: 10px;
  height:100px;
  padding:5px 10px 5px 10px;
  gap: 10px;

}

.card-image {
  justify-self: start;
  height: 90px;
  width: 90px;
  border-radius: 5px;

}

.card-title {

  font-weight: bold;
  font-size: 22px;
  justify-self: center;
  align-content: center;

}

.card-prix {

  font-weight: bold;
  font-size: 15px;
  justify-self: center;
  align-content: center;


}
.card-prix-remove-container {


  justify-self: end;
  align-content: center;
}

.card-remove {

  background: #ff0000;
  justify-self: end;
}

.card-remove {

  font-size:15px;
  border:none;
  border-radius: 5px;
  box-shadow: 2px 2px #ff0000;
  color: #ffffff;
  font-weight: bold;
  transition: ease-in-out 0.2s;
  padding: 5px;
  cursor: pointer;

}


.card-remove:hover {

  transform:translateY(1px);
  box-shadow: 2px 0 2px #ff7676;
}
</style>