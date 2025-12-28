export interface Translation {
  translation: string /** translation of the word in selected language */
  phonetic: string /** simple phonetic transliteration of the word in english */
}

export interface TranslatedWords {
  [word: string]: Translation
} /** list of words in selected language */

import { wordList as frenchWordList } from './fr'
import { wordList as spanishWordList } from './es'
import { wordList as russianWordList } from './ru'
import { wordList as germanWordList } from './de'
import { wordList as hindiWordList } from './hi'
import { wordList as bengaliWordList } from './bn'
import { wordList as chineseWordList } from './zh'
import { wordList as japaneseWordList } from './ja'
import { wordList as arabicWordList } from './ar'
import { wordList as italianWordList } from './it'
import { wordList as indonesianWordList } from './id'
import { wordList as turkishWordList } from './tr'
import type { LangCode } from '../languages'

/*
  TODO: lazy load word lists
  maybe like this
  switch (lang) {
    case 'fr':
      return () => import('./fr')
*/

export const getWordListForLang = (lang: LangCode): TranslatedWords => {
  switch (lang) {
    case 'fr':
      return frenchWordList
    case 'es':
      return spanishWordList
    case 'ru':
      return russianWordList
    case 'de':
      return germanWordList
    case 'hi':
      return hindiWordList
    case 'bn':
      return bengaliWordList
    case 'zh':
      return chineseWordList
    case 'ja':
      return japaneseWordList
    case 'ar':
      return arabicWordList
    case 'it':
      return italianWordList
    case 'id':
      return indonesianWordList
    case 'tr':
      return turkishWordList
    default:
      return frenchWordList
  }
}

export const searchWordsInLang = (lang: LangCode, query: string): string[] => {
  const wordList = getWordListForLang(lang)
  return Object.keys(wordList).filter((word) => word.includes(query.toLowerCase()))
}
