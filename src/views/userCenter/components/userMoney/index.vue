<template>
    <div class="moneys text-#555555">
        <div class="money-item flex align-center justify-between">
            <div class="meso flex-1 text-center">
                <p class="font-size-18px font-bold">0</p>
                <a-tooltip color="#fff" placement="bottom">
                    <template #title>
                        <span class="font-size-12px text-#555555">需前往遊戲內上載哦</span>
                    </template>
                    <p class="font-size-14px">網站金幣</p>
                </a-tooltip>
            </div>
            <a-divider type="vertical" class="h-40px mt-10px" />
            <div class="pay flex-1 text-center">
                <p class="font-size-18px font-bold">0</p>
                <a-tooltip color="#fff" placement="bottom">
                    <template #title>
                        <span class="font-size-12px text-#555555">需前往遊戲內上載哦</span>
                    </template>
                    <p class="font-size-14px">網站樂豆</p>
                </a-tooltip>
            </div>
        </div>
        <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
            <p class="font-size-15px">纍積贊助樂豆: <span class="font-size-16px font-bold">0</span></p>
        </div>
        <div class="select-item h-45px flex">
            <a-button class="w-full" type="primary" @click="() => router.push('sponsor')"><a>贊助我們</a></a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
.moneys {
    display: flex;
    flex-direction: column;
}

.select-item {
    p {
        padding: 0;
        margin: 0;
    }

    align-items: center;
}
</style>
