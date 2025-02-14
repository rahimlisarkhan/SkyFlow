import { Layout, Menu, Button, Typography, Flex } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "@/common/theme/home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageDropdown from "@/common/components/LangSelect";
import { useTranslation } from "next-i18next";
import withRoleGuard, { CheckType } from "@/common/hoc/withRoleGuard";
import MetaSeo from "@/common/components/MetaSeo";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function Home() {
  const router = useRouter();

  const { t } = useTranslation("common");

  // Refs for sections
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const productRef = useRef(null);

  // Scroll to the section when menu item is clicked
  interface SectionRef {
    current: HTMLElement | null;
  }

  const scrollToSection = (ref: SectionRef) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout className={styles.layout}>
      <MetaSeo title="Home | Skyflow" description="Lorem ipsum" />
      {/* Header */}
      <Header className={styles.header}>
        <div className={styles.logo}>SkyFlow</div>
        <Menu theme="dark" mode="horizontal" className={styles.menu}>
          <Menu.Item key="1" onClick={() => scrollToSection(aboutRef)}>
            About
          </Menu.Item>
          <Menu.Item key="2" onClick={() => scrollToSection(productRef)}>
            Product
          </Menu.Item>
          <Menu.Item key="3" onClick={() => router.push("/pricing")}>
            Pricing
          </Menu.Item>
          <Menu.Item key="4" onClick={() => scrollToSection(contactRef)}>
            Contact
          </Menu.Item>
        </Menu>

        <Flex gap={12}>
          <Button type="primary" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
          <LanguageDropdown />
        </Flex>
      </Header>

      {/* Hero Section */}
      <Content className={styles.content}>
        <Title className={styles.title}>{t("title")}</Title>
        <Paragraph className={styles.subtitle}>
          The next-generation cloud solution for seamless data management.
        </Paragraph>
        <Button type="primary" size="large">
          Get Started
        </Button>
      </Content>

      {/* About Section */}
      <section ref={aboutRef} className={styles.section}>
        <Title level={2}>About Us</Title>
        <Paragraph>
          SkyFlow is a cloud-based platform designed to help businesses manage
          their data securely and efficiently.
        </Paragraph>
      </section>

      {/* Product Section */}
      <section ref={productRef} className={styles.section}>
        <Title level={2}>Our Product</Title>
        <Paragraph>
          Our product offers real-time data synchronization, analytics, and
          automation to streamline your workflow.
        </Paragraph>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={styles.section}>
        <Title level={2}>Contact Us</Title>
        <Paragraph>Email: support@skyflow.com</Paragraph>
        <Paragraph>Phone: +123 456 7890</Paragraph>
      </section>

      {/* Footer */}
      <Footer className={styles.footer}>
        © 2024 SkyFlow. All Rights Reserved.
      </Footer>
    </Layout>
  );
}

export default withRoleGuard(Home, CheckType.USER);

export async function getServerSideProps({ locale = "az" }: any) {
  let languages = { ...(await serverSideTranslations(locale, ["common"])) };

  return {
    props: {
      ...languages,
    },
  };
}
