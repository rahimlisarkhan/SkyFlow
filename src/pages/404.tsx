import { useRouter } from 'next/router';
import { NotFound } from '@/common/components/NotFound';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import PageLayout from '@/modules/home/components/PageLayout';

const NotFoundPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <PageLayout header footer error>
      <NotFound
        status="404"
        title="404"
        subTitle={t('error_sub_title')}
        backTitle={t('error_back_title')}
        onBack={() => router.push('/')}
      />
    </PageLayout>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
