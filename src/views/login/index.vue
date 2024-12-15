<template>
    <a-modal getContainer="body" :maskClosable="false" :closable="true" :footer="null" v-model:open="open"
        @ok="handleOk" cancelText="关闭1">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>
<script setup lang="ts">
const open = ref<boolean>(true);
const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
};
</script>
<style scoped lang="scss"></style>