import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      fashion: "Fashion",
      shop_by_categories: "Shop By Categories",
      home: "Home",
      electronics: "Electronics",
      bags: "Bags",
      footwear: "Footwear",
      groceries: "Groceries",
      beauty: "Beauty",
      wellness: "Wellness",
      jwellery: "Jewellery",
      free_delivery: "Free International Delivery",
      men: "Men",
      women: "Women",
      kids: "Kids",
      girls: "Girls",
      boys: "Boys"
    }
  },
  hi: {
    translation: {
      fashion: "फैशन",
      shop_by_categories: "श्रेणियों के अनुसार खरीदें",
      home: "होम",
      electronics: "इलेक्ट्रॉनिक्स",
      bags: "बैग्स",
      footwear: "जूते",
      groceries: "किराना",
      beauty: "सौंदर्य",
      wellness: "स्वास्थ्य",
      jwellery: "गहने",
      free_delivery: "मुफ़्त अंतर्राष्ट्रीय डिलीवरी",
      men: "पुरुष",
      women: "महिलाएं",
      kids: "बच्चे",
      girls: "लड़कियाँ",
      boys: "लड़के"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
