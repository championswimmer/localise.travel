interface Language {
  name: string
  name_en: string
  code: LangCode
  emoji: string
}

export type LangCode = 'fr' | 'es' | 'zh' | 'ar' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja' | 'de' | 'it' | 'id'

export const AppLanguages: { [code: string]: Language } = {
  fr: {
    name: 'Français',
    name_en: 'French',
    code: 'fr',
    emoji: '🇫🇷',
  },
  es: {
    name: 'Español',
    name_en: 'Spanish',
    code: 'es',
    emoji: '🇪🇸',
  },
  zh: {
    name: '中文',
    name_en: 'Chinese',
    code: 'zh',
    emoji: '🇨🇳',
  },
  ar: {
    name: 'العربية',
    name_en: 'Arabic',
    code: 'ar',
    emoji: '🇸🇦',
  },
  hi: {
    name: 'हिन्दी',
    name_en: 'Hindi',
    code: 'hi',
    emoji: '🇮🇳',
  },
  pt: {
    name: 'Português',
    name_en: 'Portuguese',
    code: 'pt',
    emoji: '🇵🇹',
  },
  bn: {
    name: 'বাংলা',
    name_en: 'Bengali',
    code: 'bn',
    emoji: '🇧🇩',
  },
  ru: {
    name: 'Русский',
    name_en: 'Russian',
    code: 'ru',
    emoji: '🇷🇺',
  },
  ja: {
    name: '日本語',
    name_en: 'Japanese',
    code: 'ja',
    emoji: '🇯🇵',
  },
  de: {
    name: 'Deutsch',
    name_en: 'German',
    code: 'de',
    emoji: '🇩🇪',
  },
  it: {
    name: 'Italiano',
    name_en: 'Italian',
    code: 'it',
    emoji: '🇮🇹',
  },
  id: {
    name: 'Bahasa Indonesia',
    name_en: 'Indonesian',
    code: 'id',
    emoji: '🇮🇩',
  },
}
