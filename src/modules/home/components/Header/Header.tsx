import React, { useMemo } from 'react';
import LanguageDropdown from '@/common/components/LangSelect';
import { Layout, Menu, Button, Flex } from 'antd';

import styles from './Header.module.css';
import { useRouter } from 'next/router';
import { ROUTER } from '@/common/constants/router';
import { useTranslation } from 'next-i18next';

const { Header } = Layout;

interface IHeader {
  error?: boolean;
}

export function HomeHeader({ error }: IHeader) {
  const router = useRouter();
  const { t } = useTranslation('common');

  const menuItems = useMemo(() => {
    return [
      {
        key: 1,
        label: t('about'),
        onClick: () => router.replace(ROUTER.HOME + '#about'),
      },
      {
        key: 2,
        label: t('product'),
        onClick: () => router.replace(ROUTER.HOME + '#product'),
      },
      {
        key: ROUTER.PRICING,
        label: t('price'),
        onClick: () => router.push(ROUTER.PRICING),
      },
      {
        key: 4,
        label: t('contact'),
        onClick: () => router.replace(ROUTER.HOME + '#contact'),
      },
    ];
  }, []);

  return (
    <Header className={styles.header}>
      <div className={styles.logo} onClick={() => router.replace(ROUTER.HOME)}>
        SkyFlow
      </div>
      {!error && (
        <>
          <Menu
            theme="dark"
            mode="horizontal"
            className={styles.menu}
            items={menuItems}
            defaultSelectedKeys={[router.asPath]}
          />

          <Flex gap={12}>
            <Button type="primary" onClick={() => router.push(ROUTER.LOGIN)}>
              {t('login')}
            </Button>
            <LanguageDropdown />
          </Flex>
        </>
      )}
    </Header>
  );
}
