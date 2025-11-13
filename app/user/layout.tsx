import SEO from "../components/Seo";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "ParaApp - Paragliding Community",
  description = "Join ParaApp, the global paragliding community. Discover flying spots, connect with pilots, and share your paragliding experiences.",
}) => {
  return (
    <>
      <SEO title={title} description={description} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
