export interface Language {
    name: string;
    name_eng: string;
    code: string;
    flag: string;
}

export const languages: Map<string, Language> = new Map([
    // French
    ['fr', {name: 'Français', name_eng: 'French', code: 'fr', flag: '🇫🇷'}],
    // Spanish
    ['es', {name: 'Español', name_eng: 'Spanish', code: 'es', flag: '🇪🇸'}],
    // German
    ['de', {name: 'Deutsch', name_eng: 'German', code: 'de', flag: '🇩🇪'}],
    // Italian
    ['it', {name: 'Italiano', name_eng: 'Italian', code: 'it', flag: '🇮🇹'}],
    // Portuguese
    ['pt', {name: 'Português', name_eng: 'Portuguese', code: 'pt', flag: '🇵🇹'}],
    // Hindi
    ['hi', {name: 'हिन्दी', name_eng: 'Hindi', code: 'hi', flag: '🇮🇳'}],
    // Bengali
    ['bn', {name: 'বাংলা', name_eng: 'Bengali', code: 'bn', flag: '🇧🇩'}],
    // Chinese
    ['zh', {name: '中文', name_eng: 'Chinese', code: 'zh', flag: '🇨🇳'}],
    // Japanese
    ['ja', {name: '日本語', name_eng: 'Japanese', code: 'ja', flag: '🇯🇵'}],
    // Arabic
    ['ar', {name: 'عربى', name_eng: 'Arabic', code: 'ar', flag: '🇸🇦'}],
]);