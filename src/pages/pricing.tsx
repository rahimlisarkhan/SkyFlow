import PageLayout from "@/modules/home/components/PageLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useInit } from "@/modules/home/hooks/useInit";
import dynamic from "next/dynamic";

const PricingContent = dynamic(
  () => import("@/modules/home/components/Price"),
  {
    ssr: false,
  },
);

export default function Pricing() {
  const { t } = useTranslation();

  useInit();

  return (
    <PageLayout metaTitle={t("price")} header footer>
      <PricingContent />
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
