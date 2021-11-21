import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import Topbar from "../topbar";

import { colors } from "../../../../theme/colors";
import { useEffect } from "react";
import { ArentGrid } from "./ArentGrid";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 5fr;
  row-gap: 25px;
`;

const AppCanvas = styled.div`
  min-height: calc(100vh - 45px);

  padding: 25px 25px 0 25px;
  margin-top: 80px;
`;

export default function LayoutBase({
  children,
  title,
  breadcrumbs,
}: {
  children: React.ReactNode;
  title: string;
  breadcrumbs: string[];
}) {
  const joinBreadcrumbs = (depth: number) =>
    breadcrumbs
      .slice(0, depth + 1)
      .map((b) => b.toLowerCase())
      .join("/");

  return (
    <AnimatePresence initial={false}>
      <Breadcrumb style={{ top: 60, left: 65, position: "fixed" }}>
        {breadcrumbs.map((b, index) => (
          <BreadcrumbItem href={`/${joinBreadcrumbs(index)}`}>
            {b}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      <Topbar key="topbar" title={title} />
      <AppCanvas>{children}</AppCanvas>
    </AnimatePresence>
  );
}
