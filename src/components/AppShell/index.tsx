/* eslint-disable react-hooks/exhaustive-deps */
import { AppShell } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

import { LoggedInHeader } from "../Header";
import LoggedInNavbar from "../Navbar";
import { useUserInfo } from "@/states/UserInfoContext";

const LoggedInContainer = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { userInfo } = useUserInfo();

  return (
    <AppShell
      fixed
      padding={44}
      navbar={<LoggedInNavbar userInfo={userInfo} />}
      header={<LoggedInHeader />}
    >
      {children}
    </AppShell>
  );
};

export default LoggedInContainer;
