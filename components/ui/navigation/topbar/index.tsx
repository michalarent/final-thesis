import { motion } from "framer-motion";
import styled from "styled-components";
import { useSidebarUpdate } from "../sidebar/SideBarContext";
import { useSidebar } from "../sidebar/SideBarContext";

const Container = styled(motion.div)`
  position: fixed;
  height: 85px;
  width: 100%;
  background: white;
  top: 0;
  left: 0;
  border-bottom: 2px solid #e0e0e0;
`;

const Title = styled.div`
  & h3 {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  font-size: 2em;
  height: 85px;
  margin: auto 25px;
  padding: 18px 0;
  position: relative;
  display: block;
  vertical-align: middle;
  color: black;
`;
export default function Topbar({ title }: { title: string }) {
  const update = useSidebarUpdate();
  const isOpen = useSidebar();
  return (
    <Container
      animate={{ marginLeft: isOpen ? "300px" : "100px" }}
      transition={{ type: "just" }}
    >
      <Title>
        <h3>{title}</h3>
      </Title>
    </Container>
  );
}
