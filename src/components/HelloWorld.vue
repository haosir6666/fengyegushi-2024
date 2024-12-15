<script setup lang="ts">
import { ref } from 'vue'
import variables from "@/styles/variables.module.scss";
defineProps<{ msg: string }>()
console.log(import.meta.env.VITE_APP_TITLE)
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card" :style="{ 'background-color': variables.bgColor }">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p class="text-red">
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="scss"> 
.read-the-docs {
  color: red;
  background-color: $bg-color;
}
</style>
