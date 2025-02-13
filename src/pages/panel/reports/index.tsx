import { PanelLayout } from '@/common/components/PanelLayout';
import withAuth, { CheckType } from '@/common/hoc/withAuth';
import withRole from '@/common/hoc/withRole';
import ReportsContent from '@/modules/panel/ReportsContent';
import { ROLE } from '@/types/profile.types';
import { Typography } from 'antd';

const { Title } = Typography;

function Reports() {
  return (
    <PanelLayout>
      <Title level={2}>Reports</Title>
      <ReportsContent />
    </PanelLayout>
  );
}

export default withRole(
  withAuth(Reports, CheckType.AUTH), // First checking Auth then role checking
  [ROLE.PRO, ROLE.ENTERPRISE]
);
