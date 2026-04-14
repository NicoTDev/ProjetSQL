<template>
<div class="forms-div">

  <InputBox ref="identifierRef" :label="'Enter your username or email'" class="w-402"></InputBox>
  <InputBox ref="passwordRef" :type="'password'" :label="'Password'" class="w-402"></InputBox>

</div>
</template>

<script setup>

import InputBox from "../../../globalComponents/InputBox.vue";
import {ref} from "vue";

const identifierRef = ref(null);
const passwordRef = ref(null);

defineExpose({

  getValues: () => {

    console.log(identifierRef.value.getValue());
    return ({

      identifier: identifierRef.value.getValue(),
      password: passwordRef.value.getValue()
    })

  }

})




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