import "../styles/globals.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar/dist/Calendar.css";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useUser } from "../hooks/user";
import { UserProvider, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Loading } from "carbon-components-react";
import InfoProvider from "../hooks/context/UserInfoContext";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = useUser();

  const AuthComponent = withPageAuthRequired(Component as any, {});
  if (!router.isReady) {
    return <Loading />;
  }

  return (
    <Auth0Provider
      domain={"http://localhost:3000"}
      clientId={"lOSQR0BFkBQmpy18SF9FLwW9KtCx9jk1"}
    >
      <UserProvider>
        <InfoProvider>
          <AuthComponent {...pageProps} />
        </InfoProvider>
      </UserProvider>
    </Auth0Provider>
  );
}
