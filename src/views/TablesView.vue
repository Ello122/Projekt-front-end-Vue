<script setup lang="ts">
import { ref } from 'vue'
import ReservationForm from './ReservationForm.vue';
import TableCard from './TableCard.vue';
import {tables} from '@/assets/tables.ts'

const isModalOpen = ref(false)
const selectedTableId = ref(0)

function handleOpenModal(id: number){
    selectedTableId.value = id
    isModalOpen.value = true
}
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div v-for="table in tables" :key="table.id">
    <TableCard :table="table" @open-reservation="handleOpenModal">
    </TableCard>
    </div>
    </div>
    <ReservationForm v-if="isModalOpen" :table-id="selectedTableId" @close-modal="isModalOpen=false"></ReservationForm>
</template>