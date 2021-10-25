import { useAuth0 } from "@auth0/auth0-react";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/ui/Card";
import LayoutBase from "../components/ui/navigation/layout";
import Sidebar from "../components/ui/navigation/sidebar";
import VideoChat from "../components/video/VideoChat";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useUser } from "../hooks/user";
import router from "next/router";
import { useEffect } from "react";

export default function Home() {
  const user = useUser();
  console.log(user);

  if (!user) {
    return <CircularProgress />;
  }

  // if (user) {
  //   if (user.new) {
  //     router.push("/onboarding");
  //   }
  // }

  console.log(user);

  return (
    <LayoutBase title="Dashboard">
      <div style={{ gridColumn: "span 1" }}>
        <Card width="100%" height="400px">
          <h3>My Injuries</h3>
        </Card>
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <Card width="100%" height="400px">
          <h3>Scheduled Meetings</h3>
        </Card>
      </div>
      <div style={{ gridColumn: "span 2" }}>
        <Card width="100%" height="400px">
          <h3>Knowledge Base</h3>
        </Card>
      </div>
    </LayoutBase>
  );
}
