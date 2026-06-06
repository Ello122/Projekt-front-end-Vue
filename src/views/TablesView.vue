<script setup lang="ts">
import { ref } from 'vue'
import ReservationForm from './ReservationForm.vue';
import TableCard from './TableCard.vue';
import {tables} from '@/assets/tables.ts'

const isModalOpen = ref(false)
const selectedTableId = ref(0)
const successToast = ref(false)

function handleOpenModal(id: number){
    selectedTableId.value = id
    isModalOpen.value = true
}

    function handleSuccessToast(){
    successToast.value = true
    setTimeout(() =>{
        successToast.value = false
    }, 3000)
}
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div v-for="table in tables" :key="table.id">
    <TableCard :table="table" @open-reservation="handleOpenModal">
    <template #badges v-if="table.id == 1">
    <div class="badge badge-error gap-2 font-bold absolute top-4 right-4 z-20">
    VIP
    </div>
    </template>
    </TableCard>
    </div>
    </div>
    <div class="toast toast-end" v-if="successToast">
        <div class="alert alert-success">
            <span>Reservation Success!</span>
        </div>
    </div>
    <ReservationForm v-if="isModalOpen" :table-id="selectedTableId" @reservation-success="handleSuccessToast" @close-modal="isModalOpen=false"></ReservationForm>
</template>