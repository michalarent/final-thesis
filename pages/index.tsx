import Head from "next/head";
import Image from "next/image";
import Card from "../components/ui/Card";
import LayoutBase from "../components/ui/navigation/layout";
import Sidebar from "../components/ui/navigation/sidebar";
import VideoChat from "../components/video/VideoChat";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <LayoutBase title="Dashboard">
      <div style={{ gridColumn: "span 2" }}>
        <Card width="100%" height="100%">
          <VideoChat />
        </Card>
      </div>
    </LayoutBase>
  );
}
