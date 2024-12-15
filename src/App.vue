<template>
  <a-config-provider class="wh-full" :locale="locale" :theme="{
    algorithm: theme.defaultAlgorithm, // 主题算法  分别是默认算法 theme.defaultAlgorithm 、暗色算法 theme.darkAlgorithm 和紧凑算法 theme.compactAlgorithm
    token: {
      colorPrimary: '#F06A45',
    },
    components: {
      Radio: {
        colorPrimary: '#00b96b',
      },
    },
  }">
    <router-view>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { theme } from 'ant-design-vue';

const locale = ref(zhCN);
</script>

<style scoped></style>
