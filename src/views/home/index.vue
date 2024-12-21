<template>
    <div ref="containerRef" class="home-index cus-scroll hidden-scrollbar" @scroll="handleScroll">
        <!-- <a-affix style="position: fixed; top: 50%; right: 0; z-index: 3; transform: translate(0%, -50%);"
            :target="() => containerRef">
            <div class="affix">
                <div v-for="i in 4" :key="i" :class="[(pagesr == i ? 'affix-item-active' : ''), 'affix-item mt-3']"
                    @click="scrollToPage(i)"></div>
            </div>
        </a-affix>
        <div ref="page1" class="page-item c1 w-full h-full">
        </div>
        <div ref="page2" class="page-item c2 w-full h-full">
            <div class="qlrrdjz">
                <img src="@/assets/images/content_2_title.png" alt="">
                <div class="imageFatherBox">
                    <img src="@/assets/images/homeXuanchuan.png" alt="">
                    <div v-for="item in familyData" :class="item.class" class="applyFor">
                        <a :href="item.QQ" target="_blank" class="applyForbtn"></a>
                    </div>
                </div>
            </div>
        </div>
        <div ref="page3" class="page-item c3 w-full h-full">
            <div class="fwqts ">
                <img src="@/assets/images/content_3_title.png" alt="">
                <div class="teseBox">
                    <div style="display: flex;width: 45%;flex-direction: column;margin-right: 10%;">
                        <img style="width: 100%;margin-bottom: 10%;" src="@/assets/images/content_3_1.png" alt="">
                        <img style="margin-left: 20%; width: 100%;" src="@/assets/images/content_3_2.png" alt="">
                    </div>
                    <img style="width: 45%;margin-top: -7%;" src="@/assets/images/content_3_3.png" alt="">
                </div>
            </div>
        </div>
        <div ref="page4" class="page-item c4 w-full h-full ">
            <div class="mxzdjjd">
                <img src="@/assets/images/content_4_title.png" alt="">
                <div class="imageShowBox cus-scroll">
                    <div class="oneBox" v-for="item in playerList" :key="item">
                        <img :src="item" alt="">
                    </div>
                </div>
                <div
                    style="margin-top: 10px;color: #f00;text-shadow: 2px 2px 2px #fff;font-size: 15px;font-weight: 700;">
                    ---- 如有侵权或玩家本人想下架可联系管理员 ----
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import user1 from '@/assets/images/userImage/user1.png';
import user2 from '@/assets/images/userImage/user2.png';
import user3 from '@/assets/images/userImage/user3.png';
import user4 from '@/assets/images/userImage/user4.png';
import user5 from '@/assets/images/userImage/user5.png';
import user6 from '@/assets/images/userImage/user6.png';
// 玩家社区
const playerList = ref([
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
])
// 家族数据
const familyData = ref([
    {
        QQ: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=jZxkrU8mQExZhW1IUM_p7-77WqAn6K4b&authKey=B5H3D6BJ0%2Bt%2B3yNxc41xkZyxqf4fEpbIJo%2Fo14BIUooKzcTOBGPrfsscCyPSvqFB&noverify=0&group_code=984387424',
        class: 'img-1',
        name: '<不夜侯>',
        introduce: '家族属于是二次元的游戏领域！这里老哥个个都是人才，说话又好听。心态主打乐观有爱。大多数玩家都所属：缺B楽,懂的都懂'
    },
    {
        QQ: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=rSkDWZP2A9YDRwOKqGoxW-LTEnc7li89&authKey=f7sRG561zMazwJDq%2FmcbaBDzUaY5G15evn%2B9oi0O8zCzk8WTfgjaVkgFFmRv8HXZ&noverify=0&group_code=872110347',
        class: 'img-2',
        name: '<好久不見>',
        introduce: '我们不是壕，我们乐于享受游戏带来的快乐和感动。我们不保证给您好的装备，提供大量的家族资金。但我們承諾准备好我们真诚的心来欢迎你的加入。准备好我们炙热的心来帮助你。我们会给可爱的萌新带来最大的帮助！'
    },
    {
        QQ: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=bcUrbmHZiqKQ-dPZxeDXhUg3zEelVXMS&authKey=ceaWS2ap%2BzIDa7vqDytsFUePcyihRTJVA5XXqyorsLhXPimRvvElZTs1vbpklb1k&noverify=0&group_code=767549017',
        class: 'img-3',
        name: '<九月神教>',
        introduce: '全是近期才入谷的萌新家族：专为萌新提供帮助。每周定期组织BOSS攻坚队、首通队。新人入会即送新手装备道具强化等道具,让你快乐度过新手期。群里更有热心老玩家在线答疑解惑，让你快速掌握本服特色玩法！本公会宗旨就是：开心游戏,快乐至上！'
    },
    {
        QQ: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=IRqvlQ1BzIOVeqmUD9QQyYJWmCekzr7y&authKey=Vlf5KSsOApZ8gMa49zrluJKNA5T57SGRQIokvfblTXDTv7EaB931APBtywyIxPk2&noverify=0&group_code=817802628',
        class: 'img-4',
        name: '<夜遊>',
        introduce: '我们很简单：扶持萌新快速发展,解答萌新所遇到各类问题。专注游戏所有内容攻略。'
    },
])
const handleScroll = () => {
    const scrollTop = containerRef.value.scrollTop; // 当前滚动条位置
    const viewportHeight = window.innerHeight; // 视口高度

    // 检测当前页
    const currentPage = Math.floor(scrollTop / viewportHeight);
    pagesr.value = currentPage + 1; // 更新页面索引
};
const containerRef = ref();
let pagesr = ref(1)
const scrollToPage = (index: number) => {
    pagesr.value = index
    const pages = containerRef.value.children;
    if (pages[index]) {
        pages[index].scrollIntoView({ behavior: 'smooth' });
    }
};

</script>

<style scoped lang="scss">
.home-index {
    height: 100vh;
    overflow-y: auto;
    /* 使其能够滚动 */
    scroll-snap-type: y mandatory;
    /* 启用滚动吸附 */
    background: url(@/assets/images/Homebg1.png) no-repeat;
    background-size: cover;
}

.page-item {
    height: 100vh;
    /* 确保每个页面的高度为视口的高度 */
    scroll-snap-align: start;
    /* 启用到达开始位置的吸附效果 */
    display: flex;
    /* 使用 flex 以便于居中内容 */
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
    /* 水平居中 */
    font-size: 2rem;
    /* 设置文本大小 */
    color: white;
    /* 设置文本颜色 */
}

.c1 {
    background: url(@/assets/images/bg.png) no-repeat center;
    background-position: 0 0;
    /* 第一页背景位置 */
    background-size: 100% 400%;
}

.c2 {
    background: url(@/assets/images/bg.png) no-repeat center;
    background-position: 0 -100vh;
    /* 第二页背景位置 */
    background-size: 100% 400%;
}

.c3 {
    background: url(@/assets/images/bg.png) no-repeat center;
    background-position: 0 -200vh;
    /* 第三页背景位置 */
    background-size: 100% 400%;

}

.c4 {
    background: url(@/assets/images/bg.png) no-repeat center;
    background-position: 0 -300vh;
    /* 第四页背景位置 */
    background-size: 100% 400%;

}

.affix-item {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background: url(@/assets/images/page_off.png) no-repeat center;
    background-size: 100% 100%;
    transition: all 0.2s ease-in-out;
}

.affix-item-active {
    background: url(@/assets/images/page_on.png) no-repeat center;
    background-size: 100% 100%;
}

.mxzdjjd {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .imageShowBox {
        width: 60vw;
        height: 50vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background-color: #fff6;
        margin-top: 3vh;
        border-radius: 20px;
        overflow: scroll;
        border: 15px solid rgba(239, 224, 128, 0.344);

        .oneBox {
            height: 30vh;
            width: 30vh;
            margin: 3vh;
            background-color: #fff;
            border-radius: 4vh;
            box-shadow: 2px 2px 10px 2px #0005;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                /* 保持宽高比并裁剪到容器尺寸 */
            }
        }

    }

}

.fwqts {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .teseBox {
        margin-top: 4vh;
        display: flex;
        width: 60vw;
        justify-content: center;
        align-items: center;

        img {
            transform: translateY(0);
            transition: all 0.3s;
        }

        img:hover {
            transform: translateY(-10px);
        }
    }
}

.qlrrdjz {
    height: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .imageFatherBox {
        position: relative;
        text-align: center;
        height: 75vh;

        img {
            height: 100%;
        }

        .applyFor {
            position: absolute;
            height: 50%;
            width: 50%;

            .applyForbtn {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 20px;
                width: 26vh;
                height: 8vh;
                background: url(@/assets/images/join_btn_default.png)no-repeat;
                background-size: 100% 90%;
            }

            .applyForbtn:hover {
                background: url(@/assets/images/join_btn_hover.png)no-repeat;
                background-size: 100% 90%;
            }
        }

        .img-1 {
            top: 0;
            left: 0;
            width: 37%;
            height: 46%;
        }

        .img-2 {
            top: 0;
            right: 0;
            width: 45%;
            height: 46%;
        }

        .img-3 {
            bottom: 1%;
            left: 0;
            width: 55%;
            height: 48%;
        }

        .img-4 {
            bottom: 1%;
            right: 0;
            width: 34%;
            height: 48%;
        }
    }

}
</style>
