import React from "react";
import styles from "./About.module.css";
import { Typography } from "antd";
import { useTranslation } from "next-i18next";

const { Title, Paragraph } = Typography;

export function About() {
  const { t } = useTranslation("common");

  return (
    <section id="about" className={styles.section}>
      <Title level={2}>{t("about")}</Title>
      <Paragraph>{t("about_desc")}</Paragraph>
    </section>
  );
}
