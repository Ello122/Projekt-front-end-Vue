<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
 <div class="navbar bg-base-100 shadow-sm">
  <RouterLink to="/Tables" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"> Reserve Table</RouterLink>
</div>
<RouterView />
</template>

<style scoped></style>
