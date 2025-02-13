import { PanelLayout } from '@/common/components/PanelLayout';
import withAuth, { CheckType } from '@/common/hoc/withAuth';
import ProjectsTable from '@/modules/panel/ProjectsTable';
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

export default withAuth(Projects, CheckType.AUTH);
