import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import PageLayout from '@/modules/home/components/PageLayout';
import Hero from '@/modules/home/components/Hero';
import About from '@/modules/home/components/About';
import Contact from '@/modules/home/components/Contact';
import Products from '@/modules/home/components/Products';
import { useInit } from '@/modules/home/hooks/useInit';
import { PanelAPI } from '@/services/api/panel.api';
import { InformationType } from '@/types/panel.types';

interface HomeProps {
  information: InformationType;
}

function Home({ information }: HomeProps) {
  useInit();

  return (
    <PageLayout header footer>
      <Hero />
      <About />
      <Products data={information.products} />
      <Contact info={information.info} />
    </PageLayout>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const response = await PanelAPI.infos();

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      information: response?.data,
    },
  };
};
