import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import ReportsContent from '@/modules/panel/containers/ReportsContent';
import { Typography } from 'antd';
import withRoleGuard from '@/common/hoc/withRoleGuard';
import { ROLE } from '@/common/constants/role';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';

const { Title } = Typography;

function Reports() {
  const { t } = useTranslation();

  return (
    <PanelLayout>
      <Title level={2}>{t('report')}</Title>
      <ReportsContent />
    </PanelLayout>
  );
}

export default withRoleGuard(Reports, [ROLE.PRO, ROLE.ENTERPRISE]);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
