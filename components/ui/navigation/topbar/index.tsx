import { motion } from "framer-motion";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import TopbarUserInfo from "./TopbarUserInfo";
import { Notification20, AppSwitcher20, Search20 } from "@carbon/icons-react/";

import {
  Content,
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";
import React from "react";
import { useRouter } from "next/router";
import { IoExit } from "react-icons/io5";

export default function Topbar({ title }: { title: string }) {
  const { logout } = useAuth0();
  const router = useRouter();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              isCollapsible
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="Wound Healing">
              [PJATK]
            </HeaderName>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                tooltipAlignment="end"
                aria-label="Notifications"
                onClick={() => {}}
              >
                <Notification20 />
              </HeaderGlobalAction>

              <HeaderGlobalAction
                aria-label="Logout"
                onClick={() => logout()}
                tooltipAlignment="end"
              >
                <IoExit size="20px" />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            {/* <SideNav
              isRail
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
            >
              <SideNavItems>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current="page"
                    href="javascript:void(0)"
                  >
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current="page"
                    href="javascript:void(0)"
                  >
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current="page"
                    href="javascript:void(0)"
                  >
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Link
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Link
                </SideNavLink>
              </SideNavItems>
            </SideNav> */}
          </Header>
        </>
      )}
    />
  );
}

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);
