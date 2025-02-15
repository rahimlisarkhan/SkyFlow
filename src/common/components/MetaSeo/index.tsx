// components/SEO.js
import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
};

export default function MetaSeo({
  title = "Skyflow",
  description,
  url,
  image,
}: Props) {
  return (
    <NextSeo
      title={title}
      description={description}
      defaultTitle={title}
      themeColor="#FEFBF6"
      openGraph={{
        url,
        title,
        type: "website",
        description,
        images: [
          {
            url: image || "",
            width: 1200, // Adjust dimensions to match Facebook recommendations
            height: 630,
            alt: title,
            type: "image/png",
          },
        ],
        siteName: title,
      }}
      twitter={{
        handle: "@yourhandle", // Replace with your Twitter handle if applicable
        site: "@yourhandle",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: "saas, user tools dashboard",
        },
      ]}
    />
  );
}
