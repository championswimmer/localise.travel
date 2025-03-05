<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue'
import { Globe } from 'lucide-vue-next'
import { WordCategories } from '@/data/categories'
import { ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import WordCard from '@/components/WordCard.vue'
import { getWordListForLang, type TranslatedWords } from '@/data/words'
import { useLangStore } from '@/stores/lang'

const searchInput = ref('')
const langStore = useLangStore()
const wordlist = ref<TranslatedWords | null>(null)

const filteredWords = computed(() => {
  if (searchInput.value.length < 2) {
    return []
  }
  wordlist.value = getWordListForLang(langStore.lang)
  return Object.keys(wordlist.value).filter(word =>
    word.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

const filteredCategories = computed(() => {
  if (searchInput.value.length < 2) {
    return WordCategories
  }
  return []
})
</script>

<template>
  <main>
    <header>
      <h1 class="text-center fw-bold fs-3 my-2">
        speak like <span class="bg-primary-subtle px-1">locals</span> when
        <span class="bg-secondary-subtle px-1">travelling</span>
      </h1>
      <div class="text-center">select the language of the destination you are travelling to</div>
      <div class="text-center">then pick a category to discover essential words and phrases</div>
    </header>
    <SearchBar v-model="searchInput" />
    <section class="container mt-4">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4">
        <CategoryCard
          v-for="category of filteredCategories"
          :category="category"
          :key="category.name"
        />
      </div>
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4">
        <WordCard
          v-for="word in filteredWords"
          :word="word"
          :translation="wordlist!![word]"
          :key="word"
        />
      </div>
    </section>
  </main>
</template>
