import { PanelLayout } from '@/common/components/PanelLayout';
import ReportsContent from '@/modules/panel/ReportsContent';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Reports() {
  return (
    <PanelLayout>
      <Title level={2}>Reports</Title>
      <ReportsContent />
    </PanelLayout>
  );
}
