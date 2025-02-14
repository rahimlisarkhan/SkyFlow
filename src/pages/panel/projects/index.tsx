import { PanelLayout } from '@/modules/panel/PanelLayout';
import withRoleGuard, { CheckType } from '@/common/hoc/withRoleGuard';
import ProjectsTable from '@/modules/panel/ProjectsTable';
import { Typography } from 'antd';
import { ROLE } from '@/common/constants/role';

const { Title } = Typography;

function Projects() {
  return (
    <PanelLayout>
      <Title level={2}>Projects</Title>
      <ProjectsTable />
    </PanelLayout>
  );
}

export default withRoleGuard(Projects, CheckType.AUTH, [
  ROLE.PRO,
  ROLE.ENTERPRISE,
]);
