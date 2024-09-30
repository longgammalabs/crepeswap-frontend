import { Language } from '../types'

export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const ZHCN: Language = { locale: 'zh-CN', language: '简体中文', code: 'zh-cn' }
export const ZHTW: Language = { locale: 'zh-TW', language: '繁體中文', code: 'zh-tw' }
export const ESES: Language = { locale: 'es-ES', language: 'Español', code: 'es-ES' }
export const FR: Language = { locale: 'fr-FR', language: 'Français', code: 'fr' }
export const DE: Language = { locale: 'de-DE', language: 'Deutsch', code: 'de' }
export const IT: Language = { locale: 'it-IT', language: 'Italiano', code: 'it' }
export const AR: Language = { locale: 'ar-SA', language: 'العربية', code: 'ar' }
export const RU: Language = { locale: 'ru-RU', language: 'Русский', code: 'ru' }
export const JA: Language = { locale: 'ja-JP', language: '日本語', code: 'ja' }
export const KO: Language = { locale: 'ko-KR', language: '한국어', code: 'ko' }
export const TR: Language = { locale: 'tr-TR', language: 'Türkçe', code: 'tr' }
export const FIL: Language = { locale: 'fil-PH', language: 'Filipino', code: 'fil' }
export const HI: Language = { locale: 'hi-IN', language: 'हिंदी', code: 'hi' }
export const HU: Language = { locale: 'hu-HU', language: 'Magyar', code: 'hu' }
export const ID: Language = { locale: 'id-ID', language: 'Bahasa Indonesia', code: 'id' }
export const NL: Language = { locale: 'nl-NL', language: 'Nederlands', code: 'nl' }
export const PL: Language = { locale: 'pl-PL', language: 'Polski', code: 'pl' }
export const PTBR: Language = { locale: 'pt-BR', language: 'Português (Brazil)', code: 'pt-br' }
export const PTPT: Language = { locale: 'pt-PT', language: 'Português', code: 'pt-pt' }
export const RO: Language = { locale: 'ro-RO', language: 'Română', code: 'ro' }
export const SVSE: Language = { locale: 'sv-SE', language: 'Svenska', code: 'sv' }
export const FI: Language = { locale: 'fi-FI', language: 'Suomalainen', code: 'fi' }
export const TA: Language = { locale: 'ta-IN', language: 'தமிழ்', code: 'ta' }
export const UK: Language = { locale: 'uk-UA', language: 'Українська', code: 'uk' }
export const VI: Language = { locale: 'vi-VN', language: 'Tiếng Việt', code: 'vi' }
export const EL: Language = { locale: 'el-GR', language: 'Ελληνικά', code: 'el' }
export const BN: Language = { locale: 'bn-BD', language: 'বাংলা', code: 'bn' }

export const languages: Record<string, Language> = {
  'en-US': EN,
  'zh-CN': ZHCN,
  'zh-TW': ZHTW,
  'es-ES': ESES,
  'fr-FR': FR,
  'de-DE': DE,
  'it-IT': IT,
  'ar-SA': AR,
  'ru-RU': RU,
  'ja-JP': JA,
  'ko-KR': KO,
  'tr-TR': TR,
  'fil-PH': FIL,
  'hi-IN': HI,
  'hu-HU': HU,
  'id-ID': ID,
  'nl-NL': NL,
  'pl-PL': PL,
  'pt-BR': PTBR,
  'pt-PT': PTPT,
  'ro-RO': RO,
  'sv-SE': SVSE,
  'fi-FI': FI,
  'ta-IN': TA,
  'uk-UA': UK,
  'vi-VN': VI,
  'el-GR': EL,
  'bn-BD': BN,
}

const languageList = Object.values(languages)

export default languageList
