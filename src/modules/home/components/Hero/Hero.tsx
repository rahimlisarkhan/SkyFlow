import React from 'react';
import styles from './Hero.module.css';
import { Button, Layout, Typography } from 'antd';
import { useTranslation } from 'next-i18next';

const { Content } = Layout;

const { Title, Paragraph } = Typography;

export function Hero() {
  const { t } = useTranslation('common');

  return (
    <Content className={styles.content}>
      <Title className={styles.title}>{t('home_title')}</Title>
      <Paragraph className={styles.subtitle}>{t('home_desc')}</Paragraph>
      <Button type="primary" size="large">
        {t('home_btn')}
      </Button>
    </Content>
  );
}
