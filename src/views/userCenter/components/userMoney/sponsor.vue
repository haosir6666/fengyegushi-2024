<template>
    <div class="sponspr-center w-full h-full pt-88px pb-20px cus-scroll">
        <div class="content w-900px max-w-full mx-auto p-16px">
            <div class="tit">
                <a-button class='btn-auth cursor-default' @click="router.push('/userCenter')">返回</a-button>
            </div>
            <div v-show="!showSponser" class="sponsor-from">
                <div class="sponsor-title">
                    <div class="sponsor-num">請選擇贊助金額</div>
                </div>
                <div class="flex justify-center items-center gap-15">
                    <a-button @click="sponsorNum = i.number" v-for="(i, index) in sponsorSelect" :key="index"
                        class='btn-auth h-60px cursor-default'>
                        <p class="p-0 m-0 font-bold">大於等於 {{ i.number }}</p>
                        <p class="p-0 m-0 font-bold font-size-15px">{{ i.text }}
                            <span class="font-size-18px text-red-500">{{ (i.number * i.ew).toFixed(0) }}</span>樂豆
                        </p>
                    </a-button>
                </div>
                <div class="line">
                    <button @click="selectWechet = true"
                        :style="selectWechet ? 'box-shadow: #000000 0px 0px 1px 1px;' : ''"
                        class="btns bg-green-500 cursor-pointer">微信</button>
                    <button @click="selectWechet = false"
                        :style="!selectWechet ? 'box-shadow: #000000 0px 0px 1px 1px;' : ''"
                        class="btns bg-blue-500 cursor-pointer">支付寶</button>
                </div>
                <div class="input-box flex justify-center items-center flex-col py-25px">
                    <p>請輸入贊助金額 比例为(1比<span class="text-red-500">10</span>):</p>
                    <div class="input w-full flex justify-center items-center">
                        <a-input-number :status="status.status" v-model:value="sponsorNum" :min="6" :step="1" max="5000"
                            size="large" class="w-50%" prefix="￥" suffix="RMB" />
                        <a-button :disabled="disabled" size="large" type="primary" @click="Pay">
                            <span class="text-#fff">確定</span>
                        </a-button>
                    </div>
                    <p class="font-size-15px text-red-500 m-0 mt-7px">{{ status.message }}</p>
                </div>
            </div>
            <div v-show="showSponser" class="show-code font-bold text-center pt-15px">
                <p>贊助金額: {{ sponsorNum }} 將獲得樂豆: {{ isNum(sponsorNum) }}</p>
                <p class="font-size-15px text-red-500">支付完成後請進入遊戲領取,請在5分鐘內完成支付，逾期失效</p>
                <p class="font-size-15px text-red-500">中途請勿刷新瀏覽器</p>
                <div class="code-box" v-if="from.payUrl">
                    <a-button class="mb-10px" :disabled="payOk" size="large" type="primary" @click="isOk(from.orderOn)">
                        <span class="text-#fff">點擊驗證是否支付成功</span>
                    </a-button>
                    <p class="text-center" @click="copyToClipboard(from.orderOn), message.success('已複製到剪貼簿')">訂單號: {{
                        from.orderOn }}</p>
                    <img class="w-240px" :src="from.payUrl" alt="code" />
                </div>
                <div class="code-box" v-else><a-spin size="large" /></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '@/router';
import api from '../../api';
import { copyToClipboard } from '@/utils/tools';
import { message } from 'ant-design-vue';

const sponsorNum = ref<number>(6);
const status = ref<{ status: 'warning' | 'error'; message: string }>({
    status: 'warning',
    message: ''
});
const selectWechet = ref(true);
const disabled = ref(false);

const showSponser = ref(false);
const payOk = ref(false);
const sponsorSelect = [
    { number: 100, text: "額外贈送5%", ew: 0.05 },
    { number: 500, text: "額外贈送7%", ew: 0.07 },
    { number: 1000, text: "額外贈送10%", ew: 0.1 },
];
const from = ref<{ orderOn: string; payUrl: string }>({
    orderOn: '',
    payUrl: ''
});
const Pay = async () => {
    disabled.value = true;
    showSponser.value = true;
    try {
        let result;
        if (selectWechet.value) {
            result = await weChatPay(sponsorNum.value);
        } else {
            result = await aliPayPay(sponsorNum.value);
        }
        if (result.code === 200) {
            from.value = JSON.parse(JSON.stringify(result.data));
            from.value.payUrl = 'data:image/png;base64,' + from.value.payUrl;
        } else {
            message.error(result.message);
        }
    } catch (err) {
        showSponser.value = false;
        message.error('獲取訂單失敗，請重試');
    } finally {
        disabled.value = false;
    }
};

const weChatPay = async (number: number) => {
    return await api.weChat(number);
};

const aliPayPay = async (number: number) => {
    return await api.aliPay(number);
};

const isOk = async (orderOn: string) => {
    payOk.value = true;
    if (!orderOn) {
        message.error('訂單號不存在');
        return;
    }
    try {
        let res = await api.payOrderOn(orderOn);
        if (res.code === 200) {
            if (res.data === true) {
                message.success('支付成功');
                await router.push('/userCenter');
            } else {
                message.warning('尚未支付成功');
            }
        } else {
            message.error(res.message);
        }
        payOk.value = false;
    } catch (err) {
        payOk.value = false;
        console.log(err);
        message.error('支付失敗');
    }
};

function isNum(number: number): number {
    let additional = 0;

    if (number >= 1000) {
        additional = number * 0.1;
    } else if (number >= 500) {
        additional = number * 0.07;
    } else if (number >= 100) {
        additional = number * 0.05;
    }

    return Math.floor(number + additional) * 10;
}

watch(sponsorNum, (newVal) => {
    if (newVal < 6) {
        status.value = {
            status: 'error',
            message: '請輸入大於等於6的金額'
        };
    } else if (newVal > 5000) {
        status.value = {
            status: 'error',
            message: '請輸入小於等於5000的金額'
        };
    } else if (newVal % 1 !== 0) {
        status.value = {
            status: 'error',
            message: '請輸入整數金額'
        };
    } else {
        status.value = {
            status: 'warning',
            message: ''
        };
    }
});
</script>

<style scoped lang="scss">
.sponspr-center {
    background: url('@/assets/images/bg_usercenter.png') no-repeat center center;
    background-size: cover;
    height: 100vh;
    overflow-y: auto;
    width: 100%;
}

.content {
    border-radius: 20px;
    background-color: $h-bg-color; // Make sure $h-bg-color is defined
    max-width: 97%;
}

.sponsor-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
}

.input-box {
    width: 100%; // Ensure input box fills the parent container
}

.line {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;

    .btns {
        width: 100px;
        height: 40px;
        border-radius: 7px;
        border: none;
        color: #fff;
        padding: 6px;
        transition: all .2s ease-in-out;
    }
}
</style>
