import dynamic from "next/dynamic";
import withRoleGuard from "@/common/hoc/withRoleGuard";
import { Typography } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { PanelLayout } from "@/modules/panel/components/PanelLayout";

// Dynamically import components
const DashboardInfo = dynamic(
  () => import("@/modules/panel/containers/DashboardInfo/DashboardInfo"),
);
const MetaSeo = dynamic(() => import("@/common/components/MetaSeo"));

const { Title } = Typography;

function Dashboard() {
  const { t } = useTranslation("common");

  return (
    <PanelLayout>
      <MetaSeo title={t("dashboard")} />
      <Title level={2}>{t("dashboard")}</Title>
      <DashboardInfo />
    </PanelLayout>
  );
}

export default withRoleGuard(Dashboard);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
