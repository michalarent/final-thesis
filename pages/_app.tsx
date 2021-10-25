import "../styles/globals.css";
import {
  SidebarProvider,
  useSidebar,
  useSidebarUpdate,
} from "../components/ui/navigation/sidebar/SideBarContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useUser } from "../hooks/user";
import { UserProvider, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CircularProgress } from "@material-ui/core";

export default function MyApp({ Component, pageProps }) {
  const update = useSidebarUpdate();
  const isOpen = useSidebar();
  const router = useRouter();
  const user = useUser();

  const AuthComponent = withPageAuthRequired(Component as any, {});
  if (!router.isReady) {
    return null;
  }

  return (
    <UserProvider>
      <SidebarProvider>
        <AnimatePresence exitBeforeEnter initial={false}>
          <AuthComponent {...pageProps} />
        </AnimatePresence>
      </SidebarProvider>
    </UserProvider>
  );
}
