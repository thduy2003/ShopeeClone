import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const
export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}
const defaultNS = 'home'
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/
    defaultNS,
    ns: ['home', 'product'],
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
