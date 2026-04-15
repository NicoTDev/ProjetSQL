<template>
  <div class="content-container center-item-column">


    <h1 class="information-title"> Account Informations </h1>


    <div class="image-username-row">

      <input id="upload" type="file" accept="image/*" hidden @change="handleFileChange" />

      <label for="upload">
        <img class="profile-image" :src="userStore.profileImage || '/icons/noPic.png'" alt="profile" />
      </label>


      <input class="username-input default-input" type="text" v-model="userNameInput" @change="handleUsernameChange" />

    </div>

    <!-- email  -->
    <EmailInputBox ref="emailInput" v-model="isDirty"></EmailInputBox>


    <button @click="sendChangeData" class="change-button">Save changes</button>



  </div>
</template>

<script setup>
import { userStore } from "../../stores/userStore";
import gsap from "gsap";
import {nextTick, ref, watch} from "vue";
import EmailInputBox from "./components/EmailInputBox.vue";

const userNameInput = ref(userStore.username || "Nom par défaut");
const isDirty = ref(false);
const emailInput = ref(null);

watch(isDirty, (newValue) => {

  if (newValue) {
    // apparition
    gsap.fromTo(".change-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
  } else {
    // disparition
    gsap.to(".change-button", {
      opacity: 0,
      y: 20,
      duration: 0.5
    })
  }
})

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  console.log("Image choisie :", file);

  if (!isDirty.value) {
    isDirty.value = true;
    await nextTick();
  }
};

const handleUsernameChange = async () => {
  if (!isDirty.value) {
    isDirty.value = true;
    await nextTick();
  }
};

const sendChangeData = () => {
  isDirty.value = false;
  userStore.username = userNameInput.value;
  userStore.email = emailInput.getValue();

};


</script>

<style scoped>

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

  font-size: 30px;

}

.information-title {

  margin-top: 20px;
  margin-bottom: 20px;


}

.change-button {

  font-family: 'Manrope', sans-serif;
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  background: linear-gradient(270deg, darkgreen, darkgreen);
  color: white;
  font-weight: 700;
  position: absolute;
  opacity: 0;
  bottom: 20px;


}

.change-button:hover {

  background: linear-gradient(270deg, rgba(31,191,0, 0.681) 0%, rgba(17,107,0, 0.873) 60%);
  color: rgb(190, 250, 169);
  scale:105%;

}
</style>