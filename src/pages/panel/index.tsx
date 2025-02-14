import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import withRoleGuard from '@/common/hoc/withRoleGuard';
import { CheckType } from '@/common/hoc/withRoleGuard';
import DashboardInfo from '@/modules/panel/containers/DashboardInfo/DashboardInfo';
import { Typography } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const { Title } = Typography;

function Dashboard() {
  const { t } = useTranslation('common');
  return (
    <PanelLayout>
      <Title level={2}>{t('dashboard')}</Title>
      <DashboardInfo />
    </PanelLayout>
  );
}

export default withRoleGuard(Dashboard, CheckType.USER);

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
