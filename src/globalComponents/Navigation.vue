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

      <img class="cart-image" >

    </router-link>



    <router-link to="/account" class="profile-view-container focusable">

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
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--nav-bar-height);
  padding: 0 16px;
  margin: 0;
  box-sizing: border-box;
  background-color: var(--couleur-navbar-background);
  gap: 16px;
  flex-wrap: wrap;
}

.focusable {
  letter-spacing: 0;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}

.focusable:hover {
  letter-spacing: 0.1rem;
  text-shadow: 2px 2px 8px #ff1500;
}

.profile-view-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.account-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.profile-image {
  height: calc(var(--nav-bar-height) - 20px);
  width: calc(var(--nav-bar-height) - 20px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.cart-image {
  height: calc(var(--nav-bar-height) - 32px);
  width: calc(var(--nav-bar-height) - 32px);
  content: url('/icons/cart-white.png');
  transition: ease-in-out 0.3s;
  flex-shrink: 0;
}

.cart-image:hover {
  content: url('/icons/cart-orange.png');
}

.logo {
  text-align: center;
  font-size: clamp(1.4rem, 2.5vw, 2.2rem);
  white-space: nowrap;
}

.profile-view-container h2,
.nav-bar h2 {
  font-size: clamp(0.9rem, 1.6vw, 1.2rem);
}

.profile-view-container h2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}

h1, h2 {
  margin: 0;
}

</style>