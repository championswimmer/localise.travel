<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const searchInput = ref('')
const emit = defineEmits(['update:searchInput'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchInput.value = target.value
  emit('update:searchInput', searchInput.value)
}
</script>

<template>
  <div>
    <input
      type="text"
      v-model="searchInput"
      @input="handleInput"
      placeholder="Search..."
      class="form-control"
    />
  </div>
</template>
