<script setup lang="ts">
import type { Subcategory } from '@/data/categories'
import { BCardTitle } from 'bootstrap-vue-next'
import LucideIcon from './LucideIcon.vue'
import { ref } from 'vue'

const hover = ref(false)
const press = ref(false)

const props = defineProps<{
  subcategory: Subcategory
}>()
</script>

<template>
  <BCard
    class="border-2 pointer"
    @mouseover="hover = true"
    @mouseleave="hover = press = false"
    @mousedown="press = true"
    @mouseup="press = false"
    :class="{
      'border-secondary': hover && !press,
      shadow: hover && !press,
      'border-primary': press,
      'shadow-sm': press,
    }"
  >
    <BCardTitle class="fs-5 fw-semibold text-lowercase">
      <LucideIcon :name="subcategory.icon" :size="24" :width="2.5" />
      {{ subcategory.name }}
    </BCardTitle>
  </BCard>
</template>
