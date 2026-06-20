import { Helmet } from "react-helmet-async";
import {
  getAbsoluteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "../utils/seo";

function SEO({ title, description, image, url, type = "website" }) {
  const safeTitle = title?.trim() || SITE_NAME;
  const safeDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const safeUrl = getAbsoluteUrl(
    url || (typeof window !== "undefined" ? window.location.pathname : "/"),
  );
  const safeImage = getAbsoluteUrl(image || DEFAULT_OG_IMAGE);

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={safeUrl} />
      <meta property="og:image" content={safeImage} />
      <link rel="canonical" href={safeUrl} />
    </Helmet>
  );
}

export default SEO;
