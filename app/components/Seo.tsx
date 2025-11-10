import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string | null;
}

export default function SEO({ title, description }: SEOProps) {
  // Title-ul e obligatoriu și folosit exact cum e trimis
  const fullTitle = `ParaApp : ${title} - your paragliding journey`;

  // Description generată pentru parapantiști dacă nu e furnizată
  const metaDescription =
    description ||
    `Discover the best paragliding spots around the world: ${title}. Join our community of pilots, share your experiences, and help grow this international paragliding network.`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
    </Head>
  );
}
