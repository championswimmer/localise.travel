<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue'
import { Globe } from 'lucide-vue-next'
import { WordCategories } from '@/data/categories'
import SearchBar from '@/components/SearchBar.vue'
import { ref } from 'vue'
import { getWordListForLang } from '@/data/words'
import WordCard from '@/components/WordCard.vue'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
const searchQuery = ref('')
const searchResults = ref<string[]>([])

const handleSearch = (query: string) => {
  searchQuery.value = query
  if (query.length >= 2) {
    const wordList = getWordListForLang(langStore.lang)
    searchResults.value = Object.keys(wordList).filter((word) =>
      word.includes(query.toLowerCase())
    )
  } else {
    searchResults.value = []
  }
}
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
    <section class="container mt-4">
      <SearchBar @search="handleSearch" />
      <div v-if="searchQuery.length < 2" class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4">
        <CategoryCard
          v-for="category of WordCategories"
          :category="category"
          :key="category.name"
        />
      </div>
      <div v-else class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4">
        <WordCard
          v-for="word in searchResults"
          :word="word"
          :translation="getWordListForLang(langStore.lang)[word]"
          :key="word"
        />
      </div>
    </section>
  </main>
</template>
