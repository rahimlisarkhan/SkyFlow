import React from "react";
import styles from "./Contact.module.css";
import { Typography } from "antd";
import { useTranslation } from "next-i18next";
import { InformationType } from "@/types/panel.types";

const { Title, Paragraph } = Typography;

interface IContact {
  info: InformationType["info"];
}

export function Contact({ info }: IContact) {
  const { t } = useTranslation("common");

  return (
    <section id="contact" className={styles.section}>
      <Title level={2}>{t("contact")}</Title>
      <Paragraph>
        {t("contact_email")}: {info.address}
      </Paragraph>
      <Paragraph>
        {t("contact_phone")}: {info.phone}
      </Paragraph>
    </section>
  );
}
