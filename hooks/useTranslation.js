import { useRouter } from "next/router";
import en from "../translations/en";
import esMX from "../translations/es-MX";
import fr from "../translations/fr";
import pt from "../translations/pt";
import he from "../translations/he";

const TRANSLATIONS={en,esMX,fr,pt,he};

export default function useTranslation(localePermits) {
  if(!localePermits || localePermits==='undefined'){
    const router = useRouter();
    const { locale, asPath } = router;
  
    const setLocale = (locale) => router.push(asPath, asPath, { locale });
  
    const t = (keyString) => TRANSLATIONS[locale][keyString];
  
    return { t, locale, setLocale };
  }else{
    const { locale, asPath } = localePermits;
  
    const setLocale = (locale) => router.push(asPath, asPath, { locale });
  
    const t = (keyString) => TRANSLATIONS[locale][keyString];
  
    return { t, locale, setLocale };
  }
   
  }