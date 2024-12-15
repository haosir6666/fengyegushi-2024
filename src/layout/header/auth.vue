<template>
    <div class="auth h-full flex items-center justify-end">
        <a-button v-if="!authStore.accessToken" class='btn-auth'>登录 | 注册</a-button>
        <a-dropdown v-else>
            <a-avatar size="default" src="https://www.antdv.com/assets/logo.1ef800a8.svg">
            </a-avatar>
            <template #overlay>
                <a-menu>
                    <!-- <a-menu-item>
                        <a href="javascript:;"><svg-icon icon-class="userCenter" size="14"
                                class="mr-1"></svg-icon>个人中心</a>
                    </a-menu-item> -->
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
import { useAuthStore } from '@/store'
const authStore = useAuthStore()

</script>

<style scoped lang="scss">
.btn-auth {
    color: $color-primary;
    border: 1px solid $color-primary;
    background-color: rgba($color: $color-primary, $alpha: 0.3);
}
</style>