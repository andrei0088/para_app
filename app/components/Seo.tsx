import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string | null;
  url?: string;
  image?: string;
}

export default function SEO({ title, description, url, image }: SEOProps) {
  // Asigurăm că titlul include "paragliding" pentru SEO
  const seoTitle = title.toLowerCase().includes("paragliding")
    ? title
    : `${title} paragliding`;

  // Structura titlului SEO-friendly
  const fullTitle = `${seoTitle} | ParaApp – your paragliding journey`;

  // Description generată cu focus pe "paragliding"
  const metaDescription =
    description ||
    `Discover the best paragliding spots around the world: ${seoTitle}. Join our community of pilots, share your experiences, and grow the international paragliding network.`;

  const siteUrl = url || "https://paraapp.com";
  const imageUrl = image || "https://paraapp.com/default-og-image.jpg";

  return (
    <Head>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta description */}
      <meta name="description" content={metaDescription} />

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical link */}
      <link rel="canonical" href={siteUrl} />
    </Head>
  );
}
