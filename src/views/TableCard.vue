<script setup lang="ts">

const props = defineProps<{table: {id: number, name: string, image: string}}>()

const emit = defineEmits<{(e: 'open-reservation', tableId: number): void}>()
</script>

<template>
<div class="card image-full aspect-square cursor-pointer transition hover:scale-105 font-mono text-center" @click="emit('open-reservation', props.table.id)">{{ props.table.name }}
    <figure class="m-0">
      <img :src="props.table.image" class="w-full h-full object-cover" />
    </figure>
</div>
</template>