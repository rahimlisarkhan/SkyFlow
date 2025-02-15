import withRoleGuard from '@/common/hoc/withRoleGuard';
import { useTranslation } from 'next-i18next';
import PageLayout from '@/modules/home/components/PageLayout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(
  () => import('@/modules/auth/components/LoginForm/LoginForm'),
  {
    ssr: false,
  }
);

function Login() {
  const { t } = useTranslation('common');

  return (
    <PageLayout metaTitle={t('login')} header footer>
      <LoginForm />
    </PageLayout>
  );
}

export default withRoleGuard(Login);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
