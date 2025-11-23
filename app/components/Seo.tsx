import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string | null;
}

export default function SEO({ title, description }: SEOProps) {
  // Asigurăm că titlul include "paragliding" pentru SEO

  // Structura titlului SEO-friendly
  const fullTitle = `${title} | ParaUp – your paragliding journey`;

  // Description generată cu focus pe "paragliding"
  const metaDescription =
    description ||
    `Discover the best paragliding spots around the world: ${title}. Join our community of pilots, share your experiences, and grow the international paragliding network.`;

  const siteUrl = "https://para-app.paragliding-high.eu/";
  const imageUrl = "https://para-app.paragliding-high.eu/logo.png";

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
