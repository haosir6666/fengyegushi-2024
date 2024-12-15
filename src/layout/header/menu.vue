<template>
    <div class="menu w-full h-full  flex justify-center items-center">
        <a-flex class="h-full w-full flex justify-center items-center" :vertical="value === 'vertical'">
            <div :class="`menu-item cursor-pointer `" v-for="(item, index) in menu" :key="index" v-show="item.isShow"
                @click="handleClick(item)">
                <p :class="`${isActived(item.path)}`">{{ item.name }}</p>
            </div>
        </a-flex>
    </div>
</template>
<script setup lang="ts">
import { meunType } from '../type'
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import router from '@/router';

const value = ref('horizontal');
const menu = ref<meunType[]>([
    { name: '首页', path: '/home', isShow: true, openUrl: false },
    { name: '关于我们', path: '/redirect', isShow: true, openUrl: false },
    { name: '测试imonials', path: '/about', isShow: false, openUrl: true },
])

function isActived(path: string) {
    return router.currentRoute.value.path === path ? 'active' : 'p';
}

function handleClick(item: meunType) {
    if (item.openUrl) {
        Modal.confirm({
            title: "提示",
            icon: createVNode(ExclamationCircleOutlined),
            content: `即将为您打开新的标签页( ${item.name} )，是否继续？`,
            onOk() {
                window.open(item.path, '_blank');
            },
        });
    } else {
        router.push(item.path);
    }
}

</script>

<style scoped lang="scss">
.active {
    margin: 0;
    transition: all .2s ease-in-out;
    color: $color-primary;
}

.p {
    color: #000000;
    margin: 0;
    transition: all .2s ease-in-out;

    &:hover {
        color: $color-primary;
    }
}

.menu-item {
    font-size: 18px;
    font-weight: bold;
    flex: 1;
    max-width: 110px;
    text-align: center;

    p {
        &:hover {
            color: $color-primary;
        }

        &:active {
            transform: scale(1.1);
            color: $color-primary;
        }
    }

}
</style>