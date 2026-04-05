
<template>
  <router-link
    class="card-container"
    :class="props.state + '-card'"
    :to="props.state !== 'unknown' ? `/item/${props.item.slug}` : '/inventory'"
    @mouseenter="hoverIn"
    @mouseleave="hoverOut"
  >
    <img
      class="item-image"
      :class="(props.state === 'unknown' ? 'blur' : props.item.rarety.toLowerCase()) + '-image'"
      src="https://res.cloudinary.com/dea0qybfa/image/upload/v1774585562/cld-sample-5.jpg"
    />

    <p class="title">{{ props.item.title }}</p>
  </router-link>
</template>

<script setup>
import gsap from "gsap";

const props = defineProps({
  item: Object,
  state: String,
});

const hoverIn = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1.1,
    y: -2,
    duration: 0.2,
    ease: "power2.out",
  });
};

const hoverOut = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1,
    y: 0,
    duration: 0.2,
    ease: "power2.out",
  });
};
</script>

<style scoped>

.card-container {

  border-radius: 10px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:15px;
  padding: 5px 5px 5px 5px;
  position: relative;



}


.item-image {

  width: 110px;
  height: 110px;

  border-radius: 12px;

}


.title {

  color: #000;
  text-align: center;
  height: 50px;
  overflow-x: hidden;
  overflow-y: auto;

}

/* Image modifier */

.blur-image {
  filter: grayscale(1) brightness(0.3) blur(3px);
}

.common-image {

  box-shadow:
    0 0 0 4px #727272,
    0 0 15px #727272,
    0 0 30px #727272;

}

.uncommon-image {

  box-shadow:
    0 0 0 4px #0d9b00,
    0 0 15px #0d9b00,
    0 0 30px #0d9b00;
}

.rare-image {

  box-shadow:
    0 0 0 4px #006bb0,
    0 0 15px #006bb0,
    0 0 30px #006bb0;

}

.epic-image {
  box-shadow:
    0 0 0 4px #5500c5,
    0 0 15px #5500c5,
    0 0 30px #5500c5;
}

.legendary-image {
  box-shadow:
    0 0 0 4px #deb800,
    0 0 15px #deb800,
    0 0 30px #deb800;
}

.unique-image {
  box-shadow:
    0 0 0 4px #ff1717,
    0 0 30px #00e34f,
    0 0 100px #42ffc5;
}





/* Card modifier */

.unknown-card {

  background: #646464;

  box-shadow:
    0 0 0 4px #b9b9b9,
    0 0 15px #b9b9b9,
    0 0 30px #b9b9b9;

}

.brought-card {

  background: linear-gradient(
    120deg,
    #d7be85 0%,
    #ffe576 15%,
    #fcf4ae 35%,
    #fff1a8 50%,
    #fcf4ae 65%,
    #ffe576 85%,
    #d7be85 100%
  );
  background-size: 250% 250%;

  box-shadow:
    0 0 0 4px #fff900,
    0 0 15px #fff900,
    0 0 30px #fff900;

}

.discovered-card {

  background: #80f0ff;

  box-shadow:
    0 0 0 4px #00decf,
    0 0 15px #00decf,
    0 0 30px #00decf;
}

</style>