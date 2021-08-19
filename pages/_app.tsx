import "../styles/globals.css";
import {
  SidebarProvider,
  useSidebar,
  useSidebarUpdate,
} from "../components/ui/navigation/sidebar/SideBarContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const update = useSidebarUpdate();
  const isOpen = useSidebar();

  return (
    <SidebarProvider>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </SidebarProvider>
  );
}
