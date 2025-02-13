import { useRouter } from 'next/router';

export const useChangeLang = () => {
  const { asPath, locale, replace } = useRouter();

  const onLocaleChange = (lang: string) => {
    localStorage.setItem('lang', lang);
    replace(asPath, asPath, { locale: lang });
  };

  return { locale, onLocaleChange };
};
