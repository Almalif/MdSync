import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonen from '../translations/en/common.json';
import registeren from '../translations/en/register.json';
import homeen from '../translations/en/home.json';
import loginen from '../translations/en/login.json';
import fileen from '../translations/en/file.json';

import common from '../translations/fr/common.json';
import register from '../translations/fr/register.json';
import login from '../translations/fr/login.json';
import home from '../translations/fr/home.json';
import file from '../translations/fr/file.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonen,
        login: loginen,
        register: registeren,
        home: homeen,
        file: fileen,
      },
      'fr-FR': {
        common,
        login,
        register,
        home,
        file,
      },
    },
    fallbackLng: ['fr'],
    debug: process.env.NODE_ENV !== 'production',
    ns: ['common'],
    defaultNS: 'common',
    initImmediate: true,
    react: {
      wait: true,
    },
  });

export default i18n;
