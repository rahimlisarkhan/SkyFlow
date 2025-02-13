import { Layout, Menu, Breadcrumb } from 'antd';
import { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import {
  DashboardOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import styles from './PanelLayout.module.css';

const { Sider, Content } = Layout;

export const PanelLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  console.log('router', router);

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
          <Menu.Item key="/panel/reports" icon={<BarChartOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="/panel/projects" icon={<FileTextOutlined />}>
            Projects
          </Menu.Item>
          <Menu.Item key="/logout" icon={<PoweroffOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayout}>
        <Content style={{ padding: '0 50px', minHeight: '100vh' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.content}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
