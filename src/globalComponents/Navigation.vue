<template>
<div class="nav-bar">

  <router-link
    :to="'/inventory'"
    :style="{ visibility: userStore.id ? 'visible' : 'hidden' }"
  >
    <h2 class="focusable">My inventory</h2>
  </router-link>

  <router-link to="/">

    <h1 class="logo focusable"> Open the box </h1>

  </router-link>

  <router-link v-if="!userStore.id" to="/auth">
    <h2 class="focusable"> Sign up </h2>
  </router-link>

  <!-- Account view -->
  <div v-else class="account-container">

    <router-link to="/cart" >

      <img :src="cart" class="cart-image" >

    </router-link>



    <router-link to="/profile" class="profile-view-container focusable">

      <img
        :src="userStore.profileImage || '/icons/noPic.png'"
        alt="profile"
        class="profile-image"
      />

      <h2> {{userStore.username}}</h2>

    </router-link>

  </div>


</div>
</template>

<script setup>

import {userStore} from "../stores/userStore";
</script>

<style scoped>


.nav-bar {

  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 10px;
  margin: 0;
  height: var(--nav-bar-height);
  background-color: var(--couleur-navbar-background);
  max-height: 100%;
}

.focusable {

  letter-spacing: 0;
  transition: ease-in-out 0.3s;
  cursor: pointer;

}

.focusable:hover {

  letter-spacing: 0.1rem;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  text-shadow: 2px 2px 8px #ff1500;

}

.profile-view-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.account-container {

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

}

.profile-image {

  height: calc(var(--nav-bar-height) - 20px);
  width: calc(var(--nav-bar-height) - 20px);
  border-radius: 50%;

}

.cart-image  {
  height: calc(var(--nav-bar-height) - 32px);
  width: calc(var(--nav-bar-height) - 32px);
  content: url('/icons/cart-white.png');
  transition: ease-in-out 0.3s;

}

.cart-image:hover  {
  height: calc(var(--nav-bar-height) - 32px);
  width: calc(var(--nav-bar-height) - 32px);
  content: url('/icons/cart-orange.png');

}




</style>