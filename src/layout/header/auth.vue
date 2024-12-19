<template>
    <div class="auth h-full flex items-center justify-end">
        <a-button v-if="!authStore.accessToken" class='btn-auth cursor-default'
            @click="appStore.handleLoginBox(true)"><a>登录 | 注册</a></a-button>
        <a-dropdown v-else>
            <a-avatar size="default" :src="authStore.userInfo.avatar">
            </a-avatar>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a href="javascript:;" @click="router.push('userCenter')"><svg-icon icon-class="userCenter"
                                size="16" class="mr-1"></svg-icon>个人中心</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="authStore.logout()"><svg-icon icon-class="off" size="16"
                                class="mr-1"></svg-icon>退出登录</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore, useAppStore } from '@/store'
const authStore = useAuthStore()
const appStore = useAppStore()
</script>

<style scoped lang="scss"></style>