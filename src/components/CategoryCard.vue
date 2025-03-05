<script setup lang="ts">
import type { Category } from '@/data/categories'
import { BCard, BCardBody, BCardTitle, BListGroup } from 'bootstrap-vue-next'
import LucideIcon from './LucideIcon.vue'
import { ref } from 'vue'

const props = defineProps<{
  category: Category
  searchInput: string
}>()

const hover = ref(false)
const press = ref(false)
</script>

<template>
  <RouterLink :to="category.path" class="col text-decoration-none">
    <BCard
      class="border-2"
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
      v-if="!searchInput || category.name.toLowerCase().includes(searchInput.toLowerCase())"
    >
      <LucideIcon
        :name="category.icon"
        :size="36"
        :width="2.5"
        class="mx-auto my-3 d-sm-block text-primary d-block"
      />
      <BCardTitle class="text-center fw-semibold fs-5">{{ category.name }}</BCardTitle>
      <BCardBody class="p-2">
        <BListGroup flush>
          <BListGroupItem
            v-for="subcat of category.subcategories"
            :key="subcat.name"
            class="mx-auto w-auto small"
          >
            <LucideIcon :name="subcat.icon" :size="18" class="text-secondary me-2 mb-1" />
            {{ subcat.name }}
          </BListGroupItem>
        </BListGroup>
      </BCardBody>
    </BCard>
  </RouterLink>
</template>

<style scoped>
.card-title {
  text-transform: lowercase;
}
.card-body {
  text-transform: lowercase;
}
</style>
