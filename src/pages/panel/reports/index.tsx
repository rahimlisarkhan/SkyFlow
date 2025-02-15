import { PanelLayout } from "@/modules/panel/components/PanelLayout";
import { Typography } from "antd";
import withRoleGuard from "@/common/hoc/withRoleGuard";
import { ROLE } from "@/common/constants/role";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

const ReportsContent = dynamic(
  () => import("@/modules/panel/containers/ReportsContent"),
);
const MetaSeo = dynamic(() => import("@/common/components/MetaSeo"));

const { Title } = Typography;

function Reports() {
  const { t } = useTranslation("common");

  return (
    <PanelLayout>
      <MetaSeo title={t("report")} />
      <Title level={2}>{t("report")}</Title>
      <ReportsContent />
    </PanelLayout>
  );
}

export default withRoleGuard(Reports, [ROLE.PRO, ROLE.ENTERPRISE]);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
