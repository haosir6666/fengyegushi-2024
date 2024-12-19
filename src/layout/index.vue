<template>
    <div class="layout position-relative w-full h-full">
        <Header class="position-absolute w-full" />
        <router-view class="w-full h-full bg-gray-100 " v-slot="{ Component, route: curRoute }">
            <transition name="fade-slide" mode="out-in" appear>
                <component :is="Component" :key="curRoute.fullPath" />
            </transition>
        </router-view>
        <Login />
    </div>
</template>
<script setup lang="ts">
import Header from './header/index.vue';
import Login from '@/views/login/index.vue'
</script>
<style scoped lang="scss"></style>