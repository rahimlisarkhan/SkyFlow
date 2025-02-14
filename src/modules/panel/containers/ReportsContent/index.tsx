import BarChart from '@/common/components/BarChart';
import LineChart from '@/common/components/LineChart';
import Skeletons from '@/common/components/Skeleton';
import { ROLE } from '@/common/constants/role';
import useCheckRole from '@/common/hooks/useCheckRole';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { initReport } from '@/common/store/slices/panelSlice';
import { Col, Row } from 'antd';
import { useEffect } from 'react';

const ReportsContent = () => {
  const { loading, report } = useAppSelector((state) => state.panel);

  const dispatch = useAppDispatch();

  const checkRole = useCheckRole([ROLE.ENTERPRISE]);

  useEffect(() => {
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
            title="Monthly Sales"
            xTitle="Sales"
            label={report?.sales.label}
            data={report?.sales.data}
          />
        </Col>
      )}

      <Col span={24}>
        <LineChart
          title="Monthly Revenue"
          xTitle="Revenue"
          label={report?.revenue.label}
          data={report?.revenue.data}
        />
      </Col>
    </Row>
  );
};

export default ReportsContent;
