import { Card, Button, Typography, Row, Col } from 'antd';
import styles from '@/styles/pricing.module.css';

const { Title, Text } = Typography;

const plans = [
  {
    name: 'Free',
    price: '$0/month',
    features: ['Basic Features', 'Community Support', 'Limited Usage'],
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$19/month',
    features: ['Advanced Features', 'Priority Support', 'Increased Limits'],
    buttonText: 'Upgrade to Pro',
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    features: ['Full Access', '24/7 Support', 'Unlimited Usage'],
    buttonText: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Choose Your Plan
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className={styles.card} bordered>
              <Title level={3}>{plan.name}</Title>
              <Text className={styles.price}>{plan.price}</Text>
              <ul className={styles.features}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Button size="large" block>
                {plan.buttonText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
