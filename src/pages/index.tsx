import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useInit } from "@/modules/home/hooks/useInit";
import { PanelAPI } from "@/services/api/panel.api";
import { InformationType } from "@/types/panel.types";

const PageLayout = dynamic(
  () => import("@/modules/home/components/PageLayout"),
);
const Hero = dynamic(() => import("@/modules/home/components/Hero"));
const About = dynamic(() => import("@/modules/home/components/About"));
const Contact = dynamic(() => import("@/modules/home/components/Contact"));
const Products = dynamic(() => import("@/modules/home/components/Products"));

interface HomeProps {
  information: InformationType;
}

function Home({ information }: HomeProps) {
  useInit();

  return (
    <PageLayout header footer>
      <Hero />
      <About />
      <Products data={information.products} />
      <Contact info={information.info} />
    </PageLayout>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const response = await PanelAPI.infos();

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      information: response?.data,
    },
  };
};
