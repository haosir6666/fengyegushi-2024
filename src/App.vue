<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import {useCounterStore} from '@/store'
const counter = useCounterStore()
</script>

<template>
  <div>
    <a-button type="primary"><svg-icon icon-class="close"/>{{counter.count}}</a-button>
    <a-button class="text-red">Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
