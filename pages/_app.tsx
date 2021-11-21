import "../styles/globals.scss";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useUser } from "../hooks/user";
import { UserProvider, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = useUser();

  const AuthComponent = withPageAuthRequired(Component as any, {});
  if (!router.isReady) {
    return null;
  }

  return (
    <UserProvider>
      <AuthComponent {...pageProps} />
    </UserProvider>
  );
}
