import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import SideBar from "../sidebar";
import Topbar from "../topbar";
import { useSidebar } from "../sidebar/SideBarContext";
import { colors } from "../../../../theme/colors";
import { useEffect } from "react";

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 5fr;
  row-gap: 25px;
`;

const AppCanvas = styled.div`
  min-height: calc(100vh - 85px);
  background-color: whitesmoke;
  width: 100%;
  z-indx: 20000;
  padding: 25px 25px 0 25px;
  margin-top: 85px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  column-gap: 25px;
  row-gap: 25px;
`;

export default function LayoutBase({ children, title }) {
  const isOpen = useSidebar();

  const variants = {
    initial: { width: "100px" },
    animate: {
      width: "300px",
    },
  };

  return (
    <AnimatePresence initial={false}>
      <Topbar key="topbar" title={title} />
      <Grid key="grid">
        <motion.div
          key="wrapper_1"
          initial={!isOpen ? "animate" : "initial"}
          transition={{ duration: 0.3 }}
          variants={variants}
          animate={isOpen ? "animate" : "initial"}
        >
          <motion.div
            key="wrapper_2"
            initial={!isOpen ? "animate" : "initial"}
            transition={{ duration: 0.3 }}
            variants={variants}
            animate={isOpen ? "animate" : "initial"}
          >
            <SideBar />
          </motion.div>
        </motion.div>
        <AppCanvas key="canvas">
          <ContentGrid>{children}</ContentGrid>
        </AppCanvas>
      </Grid>
    </AnimatePresence>
  );
}
