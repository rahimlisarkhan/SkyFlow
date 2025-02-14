import { PanelLayout } from '@/modules/panel/PanelLayout';
import withRoleGuard from '@/common/hoc/withRoleGuard';
import { CheckType } from '@/common/hoc/withRoleGuard';
import DashboardInfo from '@/modules/panel/DashboardInfo/DashboardInfo';
import { Typography } from 'antd';
import ErrorBoundary from '@/common/components/ErrorBoundary';

const { Title } = Typography;

function Dashboard() {
  return (
    <PanelLayout>
      <Title level={2}>Dashboard</Title>
      <DashboardInfo />
    </PanelLayout>
  );
}

export default withRoleGuard(Dashboard, CheckType.AUTH);
