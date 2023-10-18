/* eslint-disable react-hooks/exhaustive-deps */

import { initialUserInfo } from "@/constants/userInfo.constants";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/helpers/localStorage";
import { getUserInfo } from "@/services";
import { UserInfo } from "@/types/userInfo.interface";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DataContextType {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  fetchData?: () => Promise<void>;
}

const UserInfoContext = createContext<DataContextType>({
  userInfo: initialUserInfo,
  setUserInfo: function (value: SetStateAction<UserInfo>): void {
    throw new Error("Function not implemented.");
  },
});

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UserInfo>(initialUserInfo);

  const router = useRouter();

  const fetchUserInfo = async () => {
    const token = getLocalStorageItem("access_token");

    if (!token) {
      router.push("/login");

      return;
    }

    if (data !== initialUserInfo) {
      return;
    }

    try {
      const response = await getUserInfo(token);

      if (response.data?.statusCode && response.data.statusCode === 401) {
        removeLocalStorageItem("access_token");
        router.replace("/login");

        return;
      }

      const data = response.data;

      setData(data);

      if (
        router.asPath === "/login" ||
        router.asPath === "/register" ||
        router.asPath === "/"
      ) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{ userInfo: data, setUserInfo: setData, fetchData: fetchUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
