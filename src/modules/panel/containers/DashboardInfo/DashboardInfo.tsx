import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import useCheckRole from '@/common/hooks/useCheckRole';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { initDashboard } from '@/common/store/slices/panelSlice';
import Skeletons from '@/common/components/Skeleton';
import { useTranslation } from 'next-i18next';
import ErrorBoundary from '@/common/components/ErrorBoundary';

const DashboardInfo = () => {
  const checkRole = useCheckRole();

  const { t } = useTranslation('common');

  const { loading, dashboard } = useAppSelector((state) => state.panel);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dashboard) return; // Already has data.

    dispatch(initDashboard());
  }, [dashboard]);

  const statistics = useMemo(() => {
    if (!dashboard?.length) return;

    return dashboard?.map((card, index) => {
      const Icon = card.value > 1000 ? ArrowUpOutlined : ArrowDownOutlined;

      const item = (
        <Col span={8} key={index}>
          <Card
            title={t(card.key || '')}
            extra={
              <Icon style={{ color: card.value > 1000 ? 'green' : 'red' }} />
            }
            style={{
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Statistic value={card.value} />
          </Card>
        </Col>
      );

      return checkRole(item, card.roles); // generate render component role base with backend data
    });
  }, [dashboard, checkRole]);

  return (
    <Row gutter={[16, 16]}>
      <ErrorBoundary>{loading ? <Skeletons /> : statistics}</ErrorBoundary>
    </Row>
  );
};

export default DashboardInfo;
