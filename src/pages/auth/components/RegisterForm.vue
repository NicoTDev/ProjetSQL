<template>
  <div class="forms-div">

    <!-- Username input -->
    <InputBox :label="'Username'" class="w-200"></InputBox>

    <!-- Last name and first name -->
    <div class="name-box">

      <InputBox :label="'Last Name'" class="w-200"></InputBox>

      <InputBox :label="'First Name'" class="w-200"></InputBox>

    </div>

    <!-- Email -->
    <InputBox :label="'Email'" class="w-402"></InputBox>

    <!-- Password -->
    <InputBox :type="'password'" :label="'Password'" class="w-402"></InputBox>

    <!-- Password Confirmation -->
    <InputBox :type="'password'" :label="'Confirm your password'" class="w-402"></InputBox>


  </div>
</template>

<script setup>

import InputBox from "../../../globalComponents/InputBox.vue";
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