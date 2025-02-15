import { Card, Button, Typography, Row, Col } from "antd";
import styles from "./Price.module.css";
import { ROLE } from "@/common/constants/role";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/common/store";
import { selUser } from "@/common/store/slices/authSlice";
import { clsnm } from "@/common/utils/clsnm";
import { useMemo } from "react";

const { Title, Text } = Typography;

export function PricingContent() {
  const user = useAppSelector(selUser);
  const { t } = useTranslation();

  const plans = useMemo(
    () => [
      {
        name: t("plan_free"),
        price: "$0/" + t("month"),
        features: [
          t("basic_features"),
          t("community_support", t("limited_usage")),
        ],
        buttonText: t("plan_btn_free"),
        type: ROLE.FREE,
      },
      {
        name: t("plan_pro"),
        price: "$19/" + t("month"),
        features: [
          t("advanced_features"),
          t("priority_support", t("increased_limits")),
        ],
        buttonText: t("plan_btn_pro"),
        type: ROLE.PRO,
      },
      {
        name: t("plan_enter"),
        price: t("price_enter"),
        features: [t("full_access"), t("full_support", t("unlimited_usage"))],
        buttonText: t("plan_btn_enter"),
        type: ROLE.ENTERPRISE,
      },
    ],
    [],
  ); // pre rendering without

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Choose Your Plan
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan, index) => {
          const activePlan = user?.license == plan.type;

          return (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                className={clsnm(
                  styles.card,
                  activePlan ? styles.card_active : "",
                )}
              >
                <Title level={3}>{plan.name}</Title>
                <Text className={styles.price}>{plan.price}</Text>
                <ul className={styles.features}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Button
                  size="large"
                  variant="filled"
                  color={activePlan ? "gold" : "default"}
                  block
                >
                  {activePlan ? t("current_use") : plan.buttonText}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
