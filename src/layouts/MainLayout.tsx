import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/common/BackToTop";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/config/site";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-background-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton message={WHATSAPP_MESSAGES.general} floating />
    </div>
  );
}
