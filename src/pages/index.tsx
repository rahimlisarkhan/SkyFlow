import withRoleGuard from '@/common/hoc/withRoleGuard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import PageLayout from '@/modules/home/components/PageLayout';
import Hero from '@/modules/home/components/Hero';
import About from '@/modules/home/components/About';
import Contact from '@/modules/home/components/Contact';
import Products from '@/modules/home/components/Products';

function Home() {
  return (
    <PageLayout header footer>
      <Hero />
      <About />
      <Products />
      <Contact />
    </PageLayout>
  );
}

export default withRoleGuard(Home);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
