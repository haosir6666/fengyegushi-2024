<template>
    <div class="app-logo h-full flex  items-center justify-start">
        <a-image @click="() => router.push('/home')" :height="60" :preview="false" src="/logo.png"
            onerror="this.src='/logo.png" />
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss"></style>