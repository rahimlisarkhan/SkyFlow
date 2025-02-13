import { PanelLayout } from '@/common/components/PanelLayout';
import withAuth, { CheckType } from '@/common/hoc/withAuth';
import ReportsContent from '@/modules/panel/ReportsContent';
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

export default withAuth(Reports, CheckType.AUTH);
