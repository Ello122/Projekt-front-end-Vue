<script setup lang="ts">

const props = defineProps<{table: {id: number, name: string}}>()

const emit = defineEmits<{(e: 'open-reservation', tableId: number): void}>()
</script>

<template>
<div class="table-card bg-sky-50" @click="emit('open-reservation', props.table.id)">{{ props.table.name }}</div>
</template>