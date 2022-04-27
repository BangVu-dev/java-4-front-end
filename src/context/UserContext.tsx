import React, { createContext, ReactNode, useEffect, useState } from "react";
import { UserModal } from "../model/User";

interface ContextProvider {
  children: ReactNode;
}

interface userContextDefault {
  userInfo: UserModal;
  changeUserInfo: () => void;
}

const userDefault = {
  userInfo: {
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "",
  },
  changeUserInfo: () => {},
};

export const UserCreateContext = createContext<userContextDefault>(userDefault);

export default function UserContext({ children }: ContextProvider) {
  const [userInfo, setUserInfo] = useState<UserModal>({
    userId: 0,
    userName: "",
    password: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    changeUserInfo();
  }, []);

  const changeUserInfo = () => {
    let userInformation;
    let userLocal = localStorage.getItem("userInfo");
    if (userLocal != undefined) {
      userInformation = JSON.parse(userLocal);      
    }   
    if (userInformation !== undefined) {
      setUserInfo(userInformation);
    } else {
      setUserInfo({
        userId: 0,
        userName: "",
        password: "",
        email: "",
        role: "",
      });
    }
  };

  const data = { userInfo, changeUserInfo };

  return <UserCreateContext.Provider value={data}>{children}</UserCreateContext.Provider>;
}
