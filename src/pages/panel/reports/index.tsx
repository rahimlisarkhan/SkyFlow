import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import ReportsContent from '@/modules/panel/containers/ReportsContent';
import { Typography } from 'antd';
import withRoleGuard, { CheckType } from '@/common/hoc/withRoleGuard';
import { ROLE } from '@/common/constants/role';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

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

export default withRoleGuard(Reports, CheckType.AUTH, [
  ROLE.PRO,
  ROLE.ENTERPRISE,
]);

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
