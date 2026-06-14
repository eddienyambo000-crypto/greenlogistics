import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const logo = settings.logo;
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar logo={logo} />
      <main className="flex-1">{children}</main>
      <Footer logo={logo} />
      <WhatsAppFloat />
    </div>
  );
}
