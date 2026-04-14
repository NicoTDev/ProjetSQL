<template>
  <div class="forms-div">

    <!-- Username input -->
    <InputBox ref="username" :label="'Username'" class="w-200"></InputBox>

    <!-- Last name and first name -->
    <div class="name-box">

      <InputBox ref="lastName" :label="'Last Name'" class="w-200"></InputBox>

      <InputBox ref="firstName" :label="'First Name'" class="w-200"></InputBox>

    </div>

    <!-- Email -->
    <InputBox ref="email" :label="'Email'" class="w-402"></InputBox>

    <!-- Password -->
    <InputBox ref="password" :type="'password'" :label="'Password'" class="w-402"></InputBox>

    <!-- Password Confirmation -->
    <InputBox ref="passwordConfirm" :type="'password'" :label="'Confirm your password'" class="w-402"></InputBox>


  </div>
</template>

<script setup>

import InputBox from "../../../globalComponents/InputBox.vue";
import {ref} from "vue";

const username = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");



defineExpose({

  getValues: () => ({
      username: username.value.getValue(),
      firstName: firstName.value.getValue(),
      lastName: lastName.value.getValue(),
      email: email.value.getValue(),
      password: password.value.getValue(),
      passwordConfirm: passwordConfirm.value.getValue(),
    })



})
</script>

<style scoped>

.name-box {

  display: flex;
  gap: 10px;

}

.forms-div {

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

}

.w-200 {

  width: 200px;

}

.w-402 {

  width: 410px;

}
</style>