import { Layout, Menu, Flex, Avatar, Typography } from 'antd';
import { PropsWithChildren, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  DashboardOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import styles from './PanelLayout.module.css';
import useCheckRole from '@/common/hooks/useCheckRole';
import { ROLE } from '@/common/constants/role';
import { logout } from '@/common/helpers/instance';
import { useAppSelector } from '@/common/store';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import { ROUTER } from '@/common/constants/router';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import LanguageDropdown from '@/common/components/LangSelect';
import { useTranslation } from 'next-i18next';

const { Sider, Content } = Layout;

interface MenuClickEvent {
  key: string;
}

export const PanelLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const { user } = useAppSelector((state) => state.auth);

  const checkRole = useCheckRole([ROLE.PRO, ROLE.ENTERPRISE]);

  const handleMenuClick = (e: MenuClickEvent) => {
    switch (e.key) {
      case '/panel':
        router.push('/panel');
        break;
      case '/panel/reports':
        router.push('/panel/reports');
        break;
      case '/panel/projects':
        router.push('/panel/projects');
        break;
      case '4':
        // Handle logout (for now we just redirect)
        router.push('/login');
        break;
      default:
        break;
    }
  };

  const menuItems: ItemType<MenuItemType>[] = useMemo(() => {
    const data = [
      {
        key: ROUTER.DASHBOARD,
        icon: <DashboardOutlined />,
        label: t('dashboard'),
      },
      checkRole({
        key: ROUTER.REPORT,
        icon: <BarChartOutlined />,
        label: t('report'),
      }),

      checkRole({
        key: ROUTER.PROJECTS,
        icon: <FileTextOutlined />,
        label: t('projects'),
      }),
      {
        key: ROUTER.LOGIN,
        icon: <PoweroffOutlined />,
        label: t('logout'),
        onClick: logout,
      },
    ];
    return data;
  }, [user]); // For un-necessary rendering

  return (
    <Layout className={styles.layout}>
      <ErrorBoundary>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={styles.sider}
        >
          <div className={styles.logo}>SkyFlow</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[router.asPath]}
            items={menuItems}
            onClick={handleMenuClick}
          ></Menu>
        </Sider>
        <Layout className={styles.siteLayout}>
          <Content className={styles.siteLayoutContent}>
            <Flex justify="flex-end" align="center" gap={12}>
              <Avatar style={{ background: 'orange' }}>
                {user?.full_name?.[0]}
              </Avatar>
              <Typography.Text>{user?.full_name}</Typography.Text>
              <LanguageDropdown />
            </Flex>
            <div className={styles.content}>{children}</div>
          </Content>
        </Layout>
      </ErrorBoundary>
    </Layout>
  );
};
