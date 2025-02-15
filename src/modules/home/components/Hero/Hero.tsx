import React from "react";
import styles from "./Hero.module.css";
import { Button, Layout, Typography } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTER } from "@/common/constants/router";
import { useAppSelector } from "@/common/store";
import { selUser } from "@/common/store/slices/authSlice";

const { Content } = Layout;

const { Title, Paragraph } = Typography;

export function Hero() {
  const { t } = useTranslation("common");

  const router = useRouter();
  const user = useAppSelector(selUser);

  return (
    <Content className={styles.content}>
      <Title className={styles.title}>{t("home_title")}</Title>
      <Paragraph className={styles.subtitle}>{t("home_desc")}</Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={() => router.push(user ? ROUTER.DASHBOARD : ROUTER.LOGIN)}
      >
        {t("home_btn")}
      </Button>
    </Content>
  );
}
