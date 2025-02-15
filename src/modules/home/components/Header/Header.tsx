import React, { useMemo } from 'react';
import LanguageDropdown from '@/common/components/LangSelect';
import { Layout, Menu, Button, Flex, Avatar, Spin } from 'antd';

import styles from './Header.module.css';
import { useRouter } from 'next/router';
import { ROUTER } from '@/common/constants/router';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/common/store';

const { Header } = Layout;

interface IHeader {
  error?: boolean;
}

export function HomeHeader({ error }: IHeader) {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth);

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

  const userContent = loading ? (
    <Spin />
  ) : user ? (
    <Avatar
      className={styles.avatar}
      onClick={() => router.push(ROUTER.DASHBOARD)}
    >
      {user?.full_name?.[0]}
    </Avatar>
  ) : (
    <Button type="primary" onClick={() => router.push(ROUTER.LOGIN)}>
      {t('login')}
    </Button>
  );

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

          <Flex gap={24}>
            <LanguageDropdown />
            {userContent}
          </Flex>
        </>
      )}
    </Header>
  );
}
