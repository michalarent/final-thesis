import { a, useSpring } from "@react-spring/web";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  IoAddCircleOutline,
  IoBook,
  IoBookOutline,
  IoBriefcase,
  IoCalendarOutline,
  IoChevronDown,
  IoChevronUp,
  IoClipboardOutline,
  IoCompassOutline,
  IoDocumentsOutline,
  IoGridOutline,
  IoHeart,
  IoHeartOutline,
  IoHelpBuoyOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import useMeasure from "react-use-measure";
import { colors } from "../../../../theme/colors";
import styles from "./SideBar.module.css";
import { useSidebar, useSidebarUpdate } from "./SideBarContext";
import { Content, Grid } from "./styled";

const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    name: string | JSX.Element;
    image?: string;
    icon?: React.ReactNode;
    url?: string;
    badgeAI?: boolean;
    badgePRO?: boolean;
    show?: boolean;
    setShow?: any;
  }
>(
  ({
    children,
    name,
    image,

    url,
    icon,

    defaultOpen = false,
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const router = useRouter();

    const show = useSidebar();
    const setShow = useSidebarUpdate();

    useEffect(() => {
      if (!show) {
        setOpen(false);
      }
    }, [show]);

    // store previous state to restore it when the user clicks on the menu

    const [ref, { height: viewHeight }] = useMeasure();
    const { height, opacity, y } = useSpring({
      from: { height: 0, opacity: 0, y: 0 },
      to: {
        height: isOpen ? (children ? viewHeight : 0) : 0,
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : 20,
      },
    });
    // @ts-ignore

    const handleOpen = (isOpen, show) => {
      children == null;
      if (show) {
        setOpen(!isOpen);
      }
      if (!show && children) {
        setShow(!show);
      }
    };

    return (
      <>
        <div
          className={router.pathname == url ? styles.tileActive : styles.tile}
          onClick={() => handleOpen(isOpen, show)}
          style={{ cursor: "pointer", overflow: "hidden" }}
        >
          <Grid>
            <div className={styles.tileIcon}>{icon ? icon : <div />}</div>

            <h3
              className={
                router.pathname == url
                  ? styles.tileTitleActive
                  : styles.tileTitle
              }
            >
              {name}
            </h3>

            <div className={styles.chevronIcon}>
              {children ? (
                isOpen ? (
                  <IoChevronDown
                    onClick={() => setOpen(!isOpen)}
                    color="gray"
                  />
                ) : (
                  <IoChevronUp onClick={() => setOpen(!isOpen)} color="gray" />
                )
              ) : null}
            </div>
          </Grid>
        </div>

        <Content
          style={{
            // @ts-ignore
            opacity: opacity,
          }}
        >
          <a.div ref={ref} style={{ y }} children={children} />
        </Content>
      </>
    );
  }
);

export default function SideBar() {
  const showSidebar = useSidebar();
  const setShowSidebar = useSidebarUpdate();
  const router = useRouter();

  const variants = {
    initial: { width: "100px" },
    animate: {
      width: "300px",
    },
  };

  const variantsPhoto = {
    initial: { rotate: 0 },
    animate: { rotate: 90 },
  };

  return (
    <>
      <motion.div
        key="sidebar_1"
        variants={variants}
        initial={!showSidebar ? "animate" : "initial"}
        animate={showSidebar ? "animate" : "initial"}
        transition={{ duration: 0.3 }}
        style={{ position: "fixed" }}
      >
        <div className={styles.sidebar}>
          <div
            style={{
              paddingTop: "15px",
              position: "relative",
              background: "linear-gradient(to bottom, #e43a15, #e65245)",
              borderBottom: "2px solid #e0e0e0",
              marginBottom: "15px",
            }}
          >
            <motion.img
              key="wrapit.png"
              src="/wrapit3.png"
              style={{
                background: "linear-gradient(to bottom, #7474bf, #348ac7)",
                borderRadius: "10px",
                padding: "5px",
                maxWidth: "50px",
                marginLeft: "25px",
                marginBottom: "15px",
                cursor: "pointer",
              }}
              variants={variantsPhoto}
              onClick={() => setShowSidebar(!showSidebar)}
              initial={!showSidebar ? "animate" : "initial"}
              animate={showSidebar ? "animate" : "initial"}
              transition={{ duration: 0.3 }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "100px",
                transform: "translateY(-50%)",
                fontSize: "1.1em",
                letterSpacing: "0.05em",
                color: colors.white,
              }}
            >
              <b style={{ fontSize: "1.2em" }}>WrapItApp</b>
              <br />
              Alpha
            </div>
          </div>
          <div
            style={{
              padding: "0 25px 5px 25px",
              borderRadius: "3px",
              paddingBottom: "10px",
            }}
          >
            <div style={{ overflow: "scroll", height: "100%" }}>
              <div onClick={() => router.push("/")}>
                <Tree
                  icon={<IoGridOutline />}
                  name="Dashboard"
                  url="/"
                  show={showSidebar}
                  setShow={setShowSidebar}
                />
              </div>
              <div onClick={() => router.push("/")}>
                <Tree
                  icon={<IoHeartOutline color="black" />}
                  name="Medical History"
                  url="/medical-history"
                  show={showSidebar}
                  setShow={setShowSidebar}
                />
              </div>
              <div onClick={() => router.push("/")}>
                <Tree
                  icon={<IoBookOutline color="black" />}
                  name="Knowledge Base"
                  url="/medical-history"
                  show={showSidebar}
                  setShow={setShowSidebar}
                />
              </div>
              <div onClick={() => router.push("/meetings")}>
                <Tree
                  icon={<IoCalendarOutline color="black" />}
                  name="Meetings"
                  url="/meetings"
                  show={showSidebar}
                  setShow={setShowSidebar}
                />
                <div className={styles.sidebarFooter}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
