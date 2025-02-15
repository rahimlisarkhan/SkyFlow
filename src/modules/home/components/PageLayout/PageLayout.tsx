import React, { PropsWithChildren } from 'react';
import styles from './PageLayout.module.css';
import { Layout } from 'antd';
import MetaSeo from '@/common/components/MetaSeo';
import Header from '../Header';
import { useTranslation } from 'next-i18next';

interface ILayout extends PropsWithChildren {
  metaTitle?: string;
  metaDesc?: string;
  header?: boolean;
  footer?: boolean;
  error?: boolean;
}

const { Footer } = Layout;

export function PageLayout({
  metaTitle = 'Skyflow',
  metaDesc = '',
  header,
  children,
  footer,
  error,
}: ILayout) {
  const { t } = useTranslation();

  return (
    <Layout className={styles.layout}>
      <MetaSeo title={metaTitle} description={metaDesc} />
      {header && <Header error={error} />}
      {children}
      {footer && <Footer className={styles.footer}>{t('footer_title')}</Footer>}
    </Layout>
  );
}
