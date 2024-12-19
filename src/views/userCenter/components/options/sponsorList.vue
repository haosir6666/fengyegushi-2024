<template>
    <div class="invitations pb-16px px-20px flex flex-col items-center justify-center">
        <div class="invitations-tit">
            <span>邀請我的玩家: {{ authStore.userInfo.bindingUser || '暫無邀請人' }}</span>
        </div>
        <a-table v-if="data" class="mt-10px" :columns="columns" :data-source="data" :scroll="{ x: tableWidth }"
            :pagination="pagination" @change="onTableChange" sticky>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'payType'">
                    <a-tag :color="record.payType === 'weChat' ? '#07C160' : '#24ACF2'">
                        {{ record.payType === 'weChat' ? '微信' : '支付寶' }}
                    </a-tag>
                </template>
                <template v-if="column.key === 'payStatus'">
                    <a-tag :color="record.payStatus === 1 ? 'green' : 'red'">
                        {{ record.payStatus === 1 ? '支付成功' : '支付失敗' }}
                    </a-tag>
                </template>
            </template>
        </a-table>
        <a-spin size="large" v-else />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '../../api/index'
import { useAuthStore } from '@/store'
import type { TablePaginationConfig } from 'ant-design-vue'

interface SponsorRecord {
    id: string
    payType: 'weChat' | 'alipay'
    payStatus: number
    amount: number
    orderOn: string
    updateTime: string
}

const authStore = useAuthStore()

const pagination = ref({
    current: 1,
    pageSize: 6,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 條`
})

const columns = [
    {
        title: '支付途徑',
        key: 'payType',
        dataIndex: 'payType',
        width: 100
    },
    {
        title: '金額',
        dataIndex: 'amount',
        key: 'amount',
        width: 100
    },
    {
        title: '訂單號',
        dataIndex: 'orderOn',
        key: 'orderOn',
        width: 100
    },
    {
        title: '支付狀態',
        dataIndex: 'payStatus',
        key: 'payStatus',
        width: 100
    },
    {
        title: '到賬時間',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 100
    }
]

const tableWidth = computed(() => columns.reduce((acc, cur) => acc + cur.width, 0))

const data = ref<SponsorRecord[]>([])

const fetchData = async (page: number, pageSize: number) => {
    try {
        const res = await api.readSponsorList({ pageNo: page, pageSize })
        if (res.code === 200) {
            data.value = res.data.dataList
            pagination.value.total = res.data.count
        }
    } catch (error) {
        console.error('獲取贊助列表失敗:', error)
    }
}

const onTableChange = (paginationConfig: TablePaginationConfig) => {
    const { current = 1, pageSize = 6 } = paginationConfig
    pagination.value = {
        ...pagination.value,
        current,
        pageSize
    }
    fetchData(current, pageSize)
}

onMounted(() => {
    fetchData(pagination.value.current, pagination.value.pageSize)
})
</script>

<style scoped></style>
