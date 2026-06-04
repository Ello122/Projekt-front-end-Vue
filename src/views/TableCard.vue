<script setup lang="ts">

const props = defineProps<{table: {id: number, name: string, image: string}}>()

const emit = defineEmits<{(e: 'open-reservation', tableId: number): void}>()
</script>

<template>
<div class="table-card bg-sky-50 aspect-square" @click="emit('open-reservation', props.table.id)">{{ props.table.name }}
    <img :src="props.table.image" class="w-full h-full object-cover">
</div>
</template>