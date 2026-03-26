<template>
<div class="forms-div">

  <InputBox :label="'Enter your username or email'" class="w-402"></InputBox>
  <InputBox :type="'password'" :label="'Password'" class="w-402"></InputBox>

</div>
</template>

<script setup>




import InputBox from "../../../globalComponents/InputBox.vue";
</script>

<style scoped>

.forms-div {

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

}

.w-402 {

  width: 410px;

}
</style>