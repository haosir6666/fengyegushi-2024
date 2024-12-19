<template>
    <a-row class="header h-68px px-20px">
        <a-col :span="3">
            <AooLogo />
        </a-col>
        <a-col :span="18">
            <Menu />
        </a-col>
        <a-col :span="3">
            <Auth />
        </a-col>
    </a-row>
</template>
<script setup lang="ts">
import AooLogo from './appLogo.vue'
import Auth from './auth.vue';
import Menu from './menu.vue';
</script>

<style scoped lang="scss">
.header {
    border-radius: 0 0 20px 20px;
    background-color: $h-bg-color;
}
</style>