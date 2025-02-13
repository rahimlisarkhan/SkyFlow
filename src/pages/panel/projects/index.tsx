import { PanelLayout } from '@/common/components/PanelLayout';
import ProjectsTable from '@/modules/panel/ProjectsTable';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Projects() {
  return (
    <PanelLayout>
      <Title level={2}>Projects</Title>
      <ProjectsTable />
    </PanelLayout>
  );
}
