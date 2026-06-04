<script setup lang="ts">
import {ref} from 'vue'
import XmarkIcon from '@iconify-vue/meteor-icons/xmark';
const form = ref({name:'', date:'', hour:'', phone:'', email:''})
const props = defineProps<{ tableId: number }>()
const emit = defineEmits<{(c: 'close-modal'): void}>()


function submit() {
    const submittedData = {
      tableId: props.tableId,
      name: form.value.name,
      date: form.value.date,
      hour: form.value.hour,
      phone: form.value.phone,
      email: form.value.email,
    }
  console.log(submittedData)
}

</script>
<template>
  <div class="modal modal-open">
  <div class="modal-box max-w-lg shadow-2xl">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="emit('close-modal')"><XmarkIcon height="1.2em" /></button>
    <h2 class="font-bold text-lg text-center">Reservation - Table No. {{ props.tableId }}</h2>
  <form @submit.prevent="submit" class="flex flex-col gap-1 items-center">
      
    <div class="mb-3 w-full flex flex-col items-center">
      <label class="block mb-2">Name:</label>
      <input type="text" placeholder="Your name" class="input" v-model="form.name" required/>
    </div>
      
    <div class="mb-3 w-full flex flex-col items-center">
        <label class="block mb-2">Date:</label>
        <input type="date" class="input" v-model="form.date" required/>
    </div>

    <div class="mb-3 w-full flex flex-col items-center">
      <label class="block mb-2">Hour:</label>
      <input type="time" class="input" v-model="form.hour" required/>
    </div>

    <div class="mb-3 w-full flex flex-col items-center">
    <label class="block mb-2">Phone:</label>
        <label class="input input-bordered">
        <input type="tel" placeholder="Phone" v-model="form.phone" required />
        </label>
    </div>

    <div class="mb-3 w-full flex flex-col items-center">
    <label class="block mb-2">Email Address:</label>
        <label class="input validator">
        <input type="email" placeholder="mail@site.com" v-model="form.email" required />
    </label>
    </div>
    <div class="validator-hint hidden">Enter valid email address</div>

    <div class="mt-4 modal-action">
      <button type="submit" class="btn btn-active btn-success">Reserve Table</button>
    </div>
  
  </form> 
  </div>
</div>
</template>