import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PageLayout from "@/modules/home/components/PageLayout";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@/common/components/NotFound"));

const NotFoundPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <PageLayout header footer error>
      <NotFound
        status="404"
        title="404"
        subTitle={t("error_sub_title")}
        backTitle={t("error_back_title")}
        onBack={() => router.push("/")}
      />
    </PageLayout>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
