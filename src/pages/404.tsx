import { useRouter } from 'next/router';
import { NotFound } from '@/common/components/NotFound';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const NotFoundPage = () => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <NotFound
      status="404"
      title="404"
      subTitle={t('error_sub_title')}
      backTitle={t('error_back_title')}
      onBack={() => router.push('/')}
    />
  );
};

export default NotFoundPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
