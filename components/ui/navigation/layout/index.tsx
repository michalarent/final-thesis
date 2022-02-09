import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import Topbar from "../topbar";

import { colors } from "../../../../theme/colors";
import { useEffect } from "react";
import { ArentGrid } from "./ArentGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  SkeletonText,
} from "carbon-components-react";
import Link from "next/link";
import Head from "next/head";
import { IUser } from "../../../../types/user";

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 5fr;
  row-gap: 25px;
`;

const AppCanvas = styled.div`
  position: relative;
  height: calc(100vh - 48px);

  padding: 25px 25px 0 25px;
  margin-top: 80px;
`;

export default function LayoutBase({
  children,
  title,
  breadcrumbs,
  loading,
  basics,
}: {
  children: React.ReactNode;
  title?: string;
  breadcrumbs: string[];
  loading?: boolean;
  basics?: IUser;
}) {
  const joinBreadcrumbs = (depth: number) =>
    breadcrumbs
      .slice(0, depth + 1)
      .map((b) => b.toLowerCase())
      .join("/");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Breadcrumb style={{ top: 60, left: 65, position: "fixed" }}>
        {breadcrumbs.map((b, index) => (
          <Link href={`/${joinBreadcrumbs(index)}`}>
            <BreadcrumbItem>{loading ? <SkeletonText /> : b}</BreadcrumbItem>
          </Link>
        ))}
      </Breadcrumb>

      <Topbar key="topbar" title={title} />

      <AppCanvas>{children}</AppCanvas>
    </>
  );
}
