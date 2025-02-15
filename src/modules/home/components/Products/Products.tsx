import React from 'react';
import styles from './Products.module.css';
import { Typography } from 'antd';
import { useTranslation } from 'next-i18next';

const { Title, Paragraph } = Typography;

export function Products() {
  const { t } = useTranslation('common');

  return (
    <section id="product" className={styles.section}>
      <Title level={2}>{t('product')}</Title>
      <Paragraph>{t('product_desc')}</Paragraph>
    </section>
  );
}
