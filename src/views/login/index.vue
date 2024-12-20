<template>
    <a-modal class="fade-slide-enter-active" style="width: 500px;" getContainer="body" :title="title"
        :maskClosable="false" :closable="true" :footer="null" v-model:open="appStore.loginBox">
        <a-form v-show="appStore.Signed ? false : true" class="mt-7 fade-slide-enter-active" :model="formState"
            :label-col="{ span: 4, hidden: true }" :wrapper-col="{ span: 18 }" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item label="賬號" name="username" :rules="[{ required: true, message: '請輸入帳號!' }]"
                style="display: flex;align-items: center;justify-content: center;">
                <a-input id="username1" size="large" v-model:value="formState.username" placeholder="請輸入賬號">
                    <template #prefix>
                        <SvgIcon iconClass="userCenter" size="15" color="#8C8C8C" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="密碼" name="password"
                :rules="[{ required: true, message: '請輸入密碼!' }]">
                <a-input-password id="password1" size="large" v-model:value="formState.password" placeholder="請輸入密碼">
                    <template #prefix>
                        <SvgIcon iconClass="password" size="17" color="#8C8C8C" />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="密碼" name="nickname"
                :rules="[{ required: true, message: '請輸入昵稱!' }]">
                <a-input size="large" v-model:value="formState.nickname" placeholder="請輸入昵稱">
                </a-input>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="密碼" name="phone"
                :rules="[{ required: true, message: '請輸入手機號!' }]">
                <a-input size="large" v-model:value="formState.phone" placeholder="請輸入手機號">
                </a-input>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="驗證碼" name="code"
                :rules="[{ required: true, message: '請輸入驗證碼!' }]">
                <a-input-search :loading="loading" v-model:value="formState.code" placeholder="請輸入驗證碼"
                    enter-button="發送驗證碼" size="large" @search="sendCode" />
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="驗證碼"
                name="inviteCode">
                <a-input v-model:value="formState.inviteCode" size="large" placeholder="選填：邀請碼" />

            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;">
                <a-button size="large" style="width: 100%;" type="primary" html-type="submit"><a>{{ title
                        }}</a></a-button>
            </a-form-item>
        </a-form>
        <a-form v-show="appStore.Signed ? true : false" class="mt-7 fade-slide-enter-active" :model="formState"
            :label-col="{ span: 4, hidden: true }" :wrapper-col="{ span: 18 }" autocomplete="off"
            @finish="onLoginFinish" @finishFailed="onFinishFailed">
            <a-form-item label="賬號" name="username" :rules="[{ required: true, message: '請輸入帳號!' }]"
                style="display: flex;align-items: center;justify-content: center;">
                <a-input size="large" v-model:value="formState.username" placeholder="請輸入賬號">
                    <template #prefix>
                        <SvgIcon iconClass="userCenter" size="15" color="#8C8C8C" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;" label="密碼" name="password"
                :rules="[{ required: true, message: '請輸入密碼!' }]">
                <a-input-password size="large" v-model:value="formState.password" placeholder="請輸入密碼">
                    <template #prefix>
                        <SvgIcon iconClass="password" size="17" color="#8C8C8C" />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item style="display: flex;align-items: center;justify-content: center;">
                <a-button size="large" style="width: 100%;" type="primary" html-type="submit"><a>{{ title
                        }}</a></a-button>
            </a-form-item>
        </a-form>
        <p class="text-#8C8C8C cursor-pointer" @click="changeSign">{{ appStore.Signed ? '還冇有賬號？' : '已有賬號？' }}</p>
    </a-modal>
</template>
<script setup lang="ts">
import apis from '@/api'
import api from './api'
import { useAppStore, useAuthStore } from '@/store'
import { notification } from "ant-design-vue";
import { message } from 'ant-design-vue';
import { encryptMessage } from '@/utils/rsa'
const appStore = useAppStore()
const authStore = useAuthStore()
interface loginData {
    username: string;
    password: string;
}
interface FormState {
    username: string;
    password: string;
    nickname: string;
    phone: string;
    code: string;
    inviteCode?: string;
}
const title = computed(() => {
    return appStore.Signed ? '登入' : '註冊'
})
const loading = ref(false)
const formState = reactive<FormState>({
    username: '',
    password: '',
    nickname: '',
    phone: '',
    code: '',
    inviteCode: '',
});
function changeSign() {
    appStore.handleSigned()
}

const sendCode = async () => {
    loading.value = true
    try {
        const res = await apis.sendPhoneCode({ phone: formState.phone, type: 1 })
        if (res.code === 200) {
            message.success('驗證碼發送成功，請在5分鍾內接受')
        }
    }
    finally {
        setTimeout(() => {
            loading.value = false
        }, 3000)
    }
}
const onLoginFinish = async (values: loginData) => {
    values.password = encryptMessage(values.password)
    let res = await apis.login(values)
    if (res.code === 200) {
        loadUserInfo(res.data.token)
    }
}
const loadUserInfo = async (token: string) => {
    authStore.setAccessToken(token)
    let res = await apis.getUserInfo()
    if (res.code === 200) {
        authStore.setUserInfo(res.data)
        appStore.handleSigned(true)
        appStore.handleLoginBox(false)
        notification["success"]({
            message: "提示",
            description: `歡迎你冒險者`,
        });
        console.log(res);
    }
}
const onFinish = async (values: FormState) => {
    values.password = encryptMessage(values.password)
    let res = await api.register(values)
    if (res.code === 200) {
        appStore.handleSigned(true)
        notification["success"]({
            message: "提示",
            description: `註冊成功，快去登入吧`,
        });
    }
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>
<style scoped lang="scss"></style>