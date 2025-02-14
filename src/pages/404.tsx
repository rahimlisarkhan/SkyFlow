import { useRouter } from "next/router";
import { NotFound } from "@/common/components/NotFound";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <NotFound
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      backTitle="Back Home"
      onBack={() => router.push("/")}
    />
  );
};

export default NotFoundPage;
