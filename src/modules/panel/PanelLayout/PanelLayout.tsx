import { Layout, Menu, Flex, Avatar, Typography } from 'antd';
import { PropsWithChildren, useState } from 'react';
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

const { Sider, Content } = Layout;

export const PanelLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const checkRole = useCheckRole([ROLE.PRO, ROLE.ENTERPRISE]);
  const checkRoleEnter = useCheckRole([ROLE.ENTERPRISE]);

  interface MenuClickEvent {
    key: string;
  }

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

  return (
    <Layout className={styles.layout}>
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
          onClick={handleMenuClick}
        >
          <Menu.Item key="/panel" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          {checkRoleEnter(
            <Menu.Item key="/panel/reports" icon={<BarChartOutlined />}>
              Reports
            </Menu.Item>
          )}
          {checkRole(
            <Menu.Item key="/panel/projects" icon={<FileTextOutlined />}>
              Projects
            </Menu.Item>
          )}

          <Menu.Item key="/logout" onClick={logout} icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayout}>
        <Content style={{ padding: '50px', minHeight: '100vh' }}>
          <Flex justify="flex-end" align="center" gap={12}>
            <Avatar style={{ background: 'orange' }}>
              {user?.full_name?.[0]}
            </Avatar>
            <Typography.Text>{user?.full_name}</Typography.Text>
          </Flex>
          <div className={styles.content}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
