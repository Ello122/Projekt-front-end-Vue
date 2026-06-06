<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import XmarkIcon from '@iconify-vue/meteor-icons/xmark';

const form = ref({ name: '', date: '', hour: '', phone: '', email: '', howManyHours:''})
const props = defineProps<{ tableId: number }>()
const emit = defineEmits<{ (c: 'close-modal'): void, (s:'reservation-success'): void }>()
const isSubmitting = ref(false)
const errorMessage = ref('')
const warning = ref('')


onMounted(() => {
  form.value.date = new Date().toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  return form.value.name.length > 2 && 
  form.value.phone.length == 9 && 
  form.value.email.includes('@') &&
  form.value.hour !== '' &&
  form.value.howManyHours !=='' &&
  form.value.howManyHours >= 1 &&
  form.value.howManyHours <= 10
})

watch(() => form.value.howManyHours,(newHour) =>{
    if(newHour === ''){
    warning.value = ''
    }
    else{
    if(Number(newHour) < 1){
      warning.value = "You can not book a table for under an hour"
    }
    else if(Number(newHour) > 10){
      warning.value = "You can not book a table for more than 10 hours" 
    }
    else{
      warning.value=''
    }
  }
})

async function submit() {
  const dataIGodzina = `${form.value.date}T${form.value.hour}:00`;

  const payload = {
    numerStolu: props.tableId,
    imie: form.value.name,
    email: form.value.email,
    telefon: form.value.phone,
    dataIGodzina: dataIGodzina,
    czasTrwaniaWGodzinach: form.value.howManyHours
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch('http://localhost:5273/api/Rezerwacje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      emit('reservation-success');
      emit('close-modal');
    } else {
      const errorData = await response.json();
      errorMessage.value = errorData.komunikat || 'Wystąpił błąd podczas rezerwacji.';
    }
  } catch (error) {
    errorMessage.value = 'Błąd sieci. Upewnij się, że backend jest uruchomiony.';
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-box max-w-lg shadow-2xl">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="emit('close-modal')">
        <XmarkIcon height="1.2em" />
      </button>
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
          <label class="block mb-2">How Many Hours:</label>
          <input type="number" placeholder="2" class="input" v-model.number="form.howManyHours" required/>
          <div v-if="warning!=''" role="alert" class="alert alert-warning alert-soft">
          <span>{{ warning }}</span>
          </div>
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

        <div v-if="errorMessage" class="text-red-500 text-sm mt-2 font-bold text-center">
          {{ errorMessage }}
        </div>

        <div class="mt-4 modal-action">
          <button type="submit" class="btn btn-active btn-success" :disabled="isSubmitting || !isFormValid">
            <span v-if="isSubmitting" class="loading loading-spinner"></span>
            Reserve Table
          </button>
        </div>
      </form> 
    </div>
  </div>
</template>