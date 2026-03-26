<template>
  <div class="content-container center-item-column">


    <h1 class="information-title"> Account Informations </h1>


    <div class="image-username-row">

      <input id="upload" type="file" accept="image/*" hidden @change="handleFileChange" />

      <label for="upload">
        <img class="profile-image" :src="userStore.profileImage || '/icons/noPic.png'" alt="profile" />
      </label>


      <input class="username-input" type="text" v-model="userNameInput" />

    </div>



  </div>
</template>

<script setup>
import {userStore} from "../../stores/userStore";
import { ref } from "vue";

const userNameInput = ref(userStore.username || "Nom par défaut");

const fileInput = ref(null);
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  console.log("Image choisie :", file);

};
</script>

<style scoped>
.hidden-input {
  display: none;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid white;
  cursor: pointer;
  object-fit: cover;
  transition: 0.3s ease-in-out;
}

.profile-image:hover {

  border: 5px solid var(--couleur-accent);


}

.center-item-column {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

}

.image-username-row {

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;


}

.username-input {


  font-family: 'Manrope', sans-serif;
  border: none;
  background-color: var(--couleur-navbar-background);
  color: white;
  font-size: 30px;
  border-radius: 10px;
  padding: 0 10px 0 10px;


}

.information-title {

  margin-top: 20px;
  margin-bottom: 20px;


}
</style>