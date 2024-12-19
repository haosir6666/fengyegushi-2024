<template>
    <div class="pb-16px px-20px flex flex-col items-center justify-center">
        <div class="text-left w-full">
            <span>邀请我的玩家: {{ authStore.userInfo.bindingUser || '暂无邀请人' }}</span>
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
import { useAuthStore } from '@/store'
import type { TablePaginationConfig } from 'ant-design-vue'

interface InviteRecord {
    nickname: string
    bindingTime: string
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
        title: '我邀请的玩家',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100
    },
    {
        title: '邀请时间',
        dataIndex: 'bindingTime',
        key: 'bindingTime',
        width: 100
    }
]

const tableWidth = computed(() => columns.reduce((acc, cur) => acc + cur.width, 0))

const data = ref<InviteRecord[]>([])

const fetchData = async (page: number, pageSize: number) => {
    try {
        const res = await api.readInviteList({ pageNo: page, pageSize })
        if (res.code === 200) {
            data.value = res.data.dataList
            pagination.value.total = res.data.count
        }
    } catch (error) {
        console.error('獲取邀請列表失敗:', error)
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
