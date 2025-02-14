import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import withRoleGuard, { CheckType } from '@/common/hoc/withRoleGuard';
import ProjectsTable from '@/modules/panel/containers/ProjectsTable';
import { Typography } from 'antd';
import { ROLE } from '@/common/constants/role';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const { Title } = Typography;

function Projects() {
  const { t } = useTranslation();

  return (
    <PanelLayout>
      <Title level={2}>{t('projects')}</Title>
      <ProjectsTable />
    </PanelLayout>
  );
}

export default withRoleGuard(Projects, CheckType.AUTH, [
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
