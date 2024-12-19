<template>
    <div class="pb-16px px-20px flex flex-col items-center justify-center">
        <div class="text-left w-full">
            <span>獲得返利總額: {{ totalRebates }}</span>
        </div>
        <a-table v-if="data" class="mt-10px" :columns="columns" :data-source="data" :scroll="{ x: tableWidth }"
            :pagination="pagination" @change="onTableChange" sticky>
        </a-table>
        <a-spin size="large" v-else />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '../../api/index'
import type { TablePaginationConfig } from 'ant-design-vue'

interface RebateRecord {
    nickname: string
    amount: number
    createTime: string
}

const totalRebates = ref(0)

const pagination = ref({
    current: 1,
    pageSize: 6,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 條`
})

const columns = [
    {
        title: '我邀请的玩家',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100
    },
    {
        title: '獲得的返利金額',
        dataIndex: 'amount',
        key: 'amount',
        width: 100
    },
    {
        title: '充值时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 100
    }
]

const tableWidth = computed(() => columns.reduce((acc, cur) => acc + cur.width, 0))

const data = ref<RebateRecord[]>([])

const fetchData = async (page: number, pageSize: number) => {
    try {
        const res = await api.readRebatesList({ pageNo: page, pageSize })
        if (res.code === 200) {
            data.value = res.data.dataList
            pagination.value.total = res.data.count
            totalRebates.value = res.data.totalRebates || 0
        }
    } catch (error) {
        console.error('獲取返利列表失敗:', error)
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
const loadRebatesNum = async () => {
    try {
        let { code, data } = await api.readRebatesNum()
        if (code === 200) {
            totalRebates.value = data
        }
    } finally {
        totalRebates.value = 0
    }
}

onMounted(() => {
    loadRebatesNum()
    fetchData(pagination.value.current, pagination.value.pageSize)
})
</script>

<style scoped></style>
