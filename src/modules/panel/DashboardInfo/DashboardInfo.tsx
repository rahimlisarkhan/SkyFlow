import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const DashboardInfo = () => {
  const cardData = [
    { title: 'Total Sales', value: '$10,000', icon: <ArrowUpOutlined /> },
    { title: 'Income', value: '$3,500', icon: <ArrowUpOutlined /> },
    { title: 'Total Orders', value: '1,200', icon: <ArrowUpOutlined /> },
    { title: 'Active Users', value: '3,000', icon: <ArrowDownOutlined /> },
    { title: 'Pending Orders', value: '200', icon: <ArrowDownOutlined /> },
    { title: 'Completed Tasks', value: '2,500', icon: <ArrowUpOutlined /> },
    { title: 'Refunds', value: '$150', icon: <ArrowDownOutlined /> },
    { title: 'Profit', value: '$5,000', icon: <ArrowUpOutlined /> },
  ];

  return (
    <Row gutter={[16, 16]}>
      {cardData.map((card, index) => (
        <Col span={8} key={index}>
          <Card
            title={card.title}
            bordered={false}
            extra={card.icon}
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
      ))}
    </Row>
  );
};

export default DashboardInfo;
