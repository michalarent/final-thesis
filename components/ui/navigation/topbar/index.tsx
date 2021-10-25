import { motion } from "framer-motion";
import styled from "styled-components";
import { useSidebarUpdate } from "../sidebar/SideBarContext";
import { useSidebar } from "../sidebar/SideBarContext";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import TopbarUserInfo from "./TopbarUserInfo";
import router from "next/router";

const Container = styled(motion.div)`
  position: fixed;
  height: 85px;
  width: 100%;
  z-index: 100;
  background: white;
  top: 0;
  left: 0;
  border-bottom: 2px solid #e0e0e0;
  display: inline-block;
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

const ButtonContainer = styled.div<{ isOpen? }>`
  padding: 12px;
  position: fixed;
  z-index: 1;
  top: 15px;
  right: 25px;
  border-radius: 5px;
  border: 2px solid #e0e0e0;
`;

export default function Topbar({ title }: { title: string }) {
  const update = useSidebarUpdate();
  const isOpen = useSidebar();
  const { logout } = useAuth0();

  return (
    <Container
      animate={{ marginLeft: isOpen ? "300px" : "100px" }}
      transition={{ type: "just" }}
    >
      <Title>
        <h3>{title}</h3>
      </Title>
      <ButtonContainer isOpen={isOpen}>
        <TopbarUserInfo />
        <Button
          size="small"
          onClick={() => router.push("/api/auth/logout")}
          variant="outlined"
        >
          Logout
        </Button>
      </ButtonContainer>
    </Container>
  );
}
