import { PanelLayout } from '@/modules/panel/components/PanelLayout';
import ReportsContent from '@/modules/panel/containers/ReportsContent';
import { Typography } from 'antd';
import withRoleGuard, { CheckType } from '@/common/hoc/withRoleGuard';
import { ROLE } from '@/common/constants/role';

const { Title } = Typography;

function Reports() {
  return (
    <PanelLayout>
      <Title level={2}>Reports</Title>
      <ReportsContent />
    </PanelLayout>
  );
}

export default withRoleGuard(Reports, CheckType.AUTH, [
  ROLE.PRO,
  ROLE.ENTERPRISE,
]);
