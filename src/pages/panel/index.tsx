import { PanelLayout } from '@/common/components/PanelLayout';
import withAuth, { CheckType } from '@/common/hoc/withAuth';
import DashboardInfo from '@/modules/panel/DashboardInfo/DashboardInfo';
import { Typography } from 'antd';

const { Title } = Typography;

function Dashboard() {
  return (
    <PanelLayout>
      <Title level={2}>Dashboard</Title>
      <DashboardInfo />
    </PanelLayout>
  );
}

export default withAuth(Dashboard, CheckType.AUTH);
