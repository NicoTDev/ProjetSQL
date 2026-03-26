
<template>
  <div class="inputbox">
    <input type="text" required="required">
    <span>{{ label }}</span>
    <i></i>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: "text"
  }
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.inputbox {

  position: relative;

}

.inputbox input {

  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #23242a;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;

}

.inputbox span {
  position: absolute;
  left: 0;
  padding: 20px 10px 10px;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 00.05em;
  transition: 0.5s;
  pointer-events: none;
}

.inputbox input:valid ~span,
.inputbox input:focus ~span {
  color: #a8a8b5;
  transform: translateX(-10px) translateY(-34px);
  font-size: 0.9em;
}

.inputbox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #b3b2b6;
  border-radius: 4px;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputbox input:valid ~i,
.inputbox input:focus ~i {
  height: 40px;
}
</style>