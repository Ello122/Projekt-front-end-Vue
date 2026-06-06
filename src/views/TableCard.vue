<script setup lang="ts">

const props = defineProps<{table: {id: number, name: string, image: string}}>()

const emit = defineEmits<{(e: 'open-reservation', tableId: number): void}>()
</script>

<template>
<div class="card image-full aspect-square cursor-pointer transition hover:scale-105 font-mono text-center" @click="emit('open-reservation', props.table.id)">
<div class="card body">
  <h2 class="card-title text-3xl font-bold text-white z-10">
  <slot name="title">{{ props.table.name }}</slot>
  <slot name="badges"></slot>
</h2>
</div>
<slot name="badges"></slot>
    <figure class="m-0">
      <img :src="props.table.image" class="w-full h-full object-cover" />
    </figure>
</div>
</template>