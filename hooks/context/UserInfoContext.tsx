import React from "react";
import { useContext } from "react";
import useUserInfo, { UserInfo } from "../user/usePatientInfo";

const UserInfoContext = React.createContext<UserInfo>(null);

export function useInfoContext() {
  return useContext(UserInfoContext);
}

export default function InfoProvider({ children }) {
  const userInfo = useUserInfo();

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}
