import React from 'react';
import styles from './Contact.module.css';
import { Typography } from 'antd';
import { useTranslation } from 'next-i18next';

const { Title, Paragraph } = Typography;

export function Contact() {
  const { t } = useTranslation('common');

  return (
    <section id="contact" className={styles.section}>
      <Title level={2}>{t('contact')}</Title>
      <Paragraph>{t('contact_email')}: support@skyflow.com</Paragraph>
      <Paragraph>{t('contact_phone')}: +123 456 7890</Paragraph>
    </section>
  );
}
