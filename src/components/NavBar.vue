<script setup lang="ts">
import { AppLanguages } from '@/data/languages'
import { useLangStore } from '@/stores/lang'
import { BNavbar, BNavbarBrand, BNavbarNav, BNavForm, BNavItem } from 'bootstrap-vue-next'
import { Globe, Languages, Footprints, SlidersHorizontal, ChevronDown, Settings } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const langStore = useLangStore()
const currentLang = computed(() => AppLanguages[langStore.lang!!])
</script>

<template>
  <BNavbar toggleable="lg" class="container-fluid">
    <BNavbarBrand to="/" class="fw-bold d-flex align-items-center">
      <Languages class="me-2 mb-1 text-primary" :size="24" />
      <Globe class="me-2 mb-1" :size="24" />
      <Footprints class="me-2 mb-1 text-secondary" :size="24" />
      <span class="text-primary">localise</span>.<span class="text-secondary">travel</span>
    </BNavbarBrand>
    <BNavForm class="d-flex">
      <button
        class="btn btn-outline-secondary border-0 d-flex align-items-center"
        @click="langStore.toggleSelector"
      >
        {{ currentLang.emoji }}
        <span class="fw-medium ms-2 d-none d-sm-inline">{{ currentLang.name }}</span>
        <span class="fw-light ms-1 d-none d-sm-inline">({{ currentLang.name_en }})</span>
        <ChevronDown class="ms-1 d-inline d-sm-none" :size="16" />
      </button>
      <button
        class="btn btn-outline-secondary border-0 d-flex align-items-center ms-2"
        @click="langStore.toggleVoiceSelector"
      >
        <Settings class="me-2 mb-1" :size="24" />
      </button>
    </BNavForm>
  </BNavbar>
</template>
