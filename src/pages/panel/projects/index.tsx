import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import withRoleGuard from '@/common/hoc/withRoleGuard';
import ProjectsTable from '@/modules/panel/containers/ProjectsTable';
import { Typography } from 'antd';
import { ROLE } from '@/common/constants/role';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import MetaSeo from '@/common/components/MetaSeo';

const { Title } = Typography;

function Projects() {
  const { t } = useTranslation('common');

  return (
    <PanelLayout>
      <MetaSeo title={t('projects')} />
      <Title level={2}>{t('projects')}</Title>
      <ProjectsTable />
    </PanelLayout>
  );
}

export default withRoleGuard(Projects, [ROLE.PRO, ROLE.ENTERPRISE]);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
