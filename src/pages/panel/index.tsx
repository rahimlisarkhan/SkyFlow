import { PanelLayout } from '@/common/components/PanelLayout';
import DashboardInfo from '@/modules/panel/DashboardInfo/DashboardInfo';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Panel() {
  return (
    <PanelLayout>
      <Title level={2}>Dashboard</Title>
      <DashboardInfo />
    </PanelLayout>
  );
}
