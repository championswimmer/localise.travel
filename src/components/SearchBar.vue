<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="onInput"
      placeholder="Search..."
      class="form-control"
    />
    <button @click="clearInput" class="btn btn-secondary mt-2">Clear</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const onInput = () => {
  emit('search', searchQuery.value)
}

const clearInput = () => {
  searchQuery.value = ''
  emit('search', searchQuery.value)
}
</script>
