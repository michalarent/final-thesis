import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext(null);
const UpdateSidebarContext = createContext(null);

export function useSidebar() {
  return useContext(SideBarContext);
}

export function useSidebarUpdate() {
  return useContext(UpdateSidebarContext);
}

export function SidebarProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <SideBarContext.Provider value={showSidebar}>
      <UpdateSidebarContext.Provider value={setShowSidebar}>
        {children}
      </UpdateSidebarContext.Provider>
    </SideBarContext.Provider>
  );
}
