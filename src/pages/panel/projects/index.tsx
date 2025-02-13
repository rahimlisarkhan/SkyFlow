import { PanelLayout } from '@/common/components/PanelLayout';
import withAuth, { CheckType } from '@/common/hoc/withAuth';
import withRole from '@/common/hoc/withRole';
import ProjectsTable from '@/modules/panel/ProjectsTable';
import { ROLE } from '@/types/profile.types';
import { Typography } from 'antd';

const { Title } = Typography;

function Projects() {
  return (
    <PanelLayout>
      <Title level={2}>Projects</Title>
      <ProjectsTable />
    </PanelLayout>
  );
}

export default withRole(
  withAuth(Projects, CheckType.AUTH), // First checking Auth then role checking
  [ROLE.PRO, ROLE.ENTERPRISE]
);
