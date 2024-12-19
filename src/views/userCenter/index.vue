<template>
    <div class="user-center w-full h-full pt-88px pb-20px cus-scroll">
        <div class="content w-1200px max-w-full mx-auto">
            <div class="user-info w-940px">
                <div class="user-avatar p-30px">
                    <div class="avatar">
                        <img class="headerimg w-90px h-90px rounded-50%" :src="authStore.userInfo.avatar" alt="頭像">
                    </div>
                    <div class="user-name flex flex-col justify-between items-start">
                        <div class="name">{{ authStore.userInfo.nickname }}</div>
                        <div class="phone">電話: {{ authStore.userInfo.phone }}</div>
                        <div class="inviteCode flex justify-between items-center">
                            <span>邀請碼: {{ authStore.userInfo.inviteCode }}</span>
                            <a-button @click="handleCopyInviteCode" :loading="copyLoading"
                                class="btn-auth cursor-default">
                                <a>複製邀請碼</a>
                            </a-button>
                        </div>
                    </div>
                </div>
                <div class="user-option">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane v-for="tab in tabs" :key="tab.key">
                            <template #tab>
                                <span class="px-10px font-size-14px text-center">{{ tab.title }}</span>
                            </template>
                            <component :is="tab.component" />
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="user-msg p-16px">
                <UserMoney />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import { message } from 'ant-design-vue'
import { copyToClipboard } from '@/utils/tools'
import { useAuthStore } from '@/store'
import Band from './components/options/band.vue'
import UserMoney from './components/userMoney/index.vue'
import SponsorList from './components/options/sponsorList.vue'
import Rebates from './components/options/rebates.vue'

interface TabItem {
    key: string
    title: string
    component: Component
}

const activeKey = ref<string>('1')
const authStore = useAuthStore()
const copyLoading = ref(false)

const tabs: TabItem[] = [
    {
        key: '1',
        title: '邀請綁定',
        component: Band
    },
    {
        key: '2',
        title: '我的返利',
        component: Rebates
    },
    {
        key: '3',
        title: '赞助订单',
        component: SponsorList
    }
]

const handleCopyInviteCode = () => {
    if (!authStore.userInfo.inviteCode) {
        message.error('無邀請碼')
        return
    }

    copyLoading.value = true
    setTimeout(() => {
        if (copyToClipboard(authStore.userInfo.inviteCode!)) {
            message.success('複製成功')
        } else {
            message.error('複製失敗')
        }
        copyLoading.value = false
    }, 1000)
}
</script>

<style scoped lang="scss">
.user-center {
    background: url(@/assets/images/bg_usercenter.png) no-repeat center center;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
    width: 100%;
}

.content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    .user-info {
        border-radius: 20px;
        background-color: $h-bg-color;
        max-width: 97%;

        .user-avatar {
            display: flex;

            .avatar {
                height: 100%;
                margin-right: 10px;

                .headerimg {
                    border: 1px solid rgb(235, 233, 233);
                    padding: 2px;
                }
            }

            .user-name {
                flex: 1;
                height: 90px;
                font-size: 14px;
                color: #555555;

                .name {
                    color: #000;
                    font-size: 21px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .inviteCode {
                    width: 100%;

                    span {
                        user-select: text;
                    }
                }
            }
        }
    }

    .user-msg {
        height: 300px;
        max-width: 97%;
        background-color: $h-bg-color;
        border-radius: 20px;
        flex: 1;
    }
}
</style>