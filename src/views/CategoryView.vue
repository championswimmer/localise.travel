<script setup lang="ts">
import LucideIcon from '@/components/LucideIcon.vue'
import SubcategoryCard from '@/components/SubcategoryCard.vue'
import WordCard from '@/components/WordCard.vue'
import { WordCategories, type Category } from '@/data/categories'
import { getWordListForLang, type TranslatedWords } from '@/data/words'
import { useLangStore } from '@/stores/lang'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

const route = useRoute()
const category = ref<Category | null>(null)

const routeName = route.params.category as string
category.value = WordCategories.find((cat) => cat.path === routeName) ?? WordCategories[0]

const selectedSubcategory = ref<string | null>(null)
const subcategory = computed(() =>
  category.value?.subcategories.find((subcat) => subcat.name === selectedSubcategory.value),
)
const langStore = useLangStore()
const wordlist = ref<TranslatedWords | null>(null)
const searchInput = ref('')

function selectSubCategory(subcategory: string) {
  selectedSubcategory.value = subcategory
  wordlist.value = getWordListForLang(langStore.lang)
}

watch(
  () => langStore.lang,
  (newLang) => {
    wordlist.value = getWordListForLang(newLang)
  },
)

wordlist.value = getWordListForLang(langStore.lang)
</script>

<template>
  <div>
    <BreadCrumbs :route="routeName" />
    <h1 class="text-center fw-bold text-lowercase text-secondary">
      <LucideIcon :name="category!!.icon" :size="42" class="align-text-top" /> {{ category!!.name }}
    </h1>
    <section>
      <!-- Subcategory Picker -->
      <div class="row m-3">
        <SubcategoryCard
          class="col m-2 shadow-sm"
          v-for="subcat in category!!.subcategories"
          :subcategory="subcat"
          :key="subcat.name"
          @click="selectSubCategory(subcat.name)"
          :class="{
            'border-primary': subcat.name === selectedSubcategory,
            'text-primary': subcat.name === selectedSubcategory,
            'border-2': subcat.name === selectedSubcategory,
            shadow: subcat.name !== selectedSubcategory,
          }"
          :searchInput="searchInput"
        />
      </div>
    </section>
    <section class="container-md">
      <!-- Word List -->
      <WordCard
        v-for="word in subcategory?.words"
        :word="word"
        :translation="wordlist!![word]"
        :key="word"
        :searchInput="searchInput"
      />
    </section>
  </div>
</template>
