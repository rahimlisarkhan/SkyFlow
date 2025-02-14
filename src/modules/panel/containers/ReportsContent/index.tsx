import BarChart from '@/common/components/BarChart';
import LineChart from '@/common/components/LineChart';
import Skeletons from '@/common/components/Skeleton';
import { ROLE } from '@/common/constants/role';
import useCheckRole from '@/common/hooks/useCheckRole';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { initReport } from '@/common/store/slices/panelSlice';
import { Col, Row } from 'antd';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const ReportsContent = () => {
  const { loading, report } = useAppSelector((state) => state.panel);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const checkRole = useCheckRole([ROLE.ENTERPRISE]);

  useEffect(() => {
    if (report) return; // Already has data.

    dispatch(initReport());
  }, []);

  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        <Skeletons length={2} width={800} height={400} span={24} />
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {checkRole(
        <Col span={24}>
          <BarChart
            title={t('monthly_sales')}
            xTitle={t('sales')}
            label={report?.sales.label}
            data={report?.sales.data}
          />
        </Col>
      )}

      <Col span={24}>
        <LineChart
          title={t('monthly_revenue')}
          xTitle={t('revenue')}
          label={report?.revenue.label}
          data={report?.revenue.data}
        />
      </Col>
    </Row>
  );
};

export default ReportsContent;
