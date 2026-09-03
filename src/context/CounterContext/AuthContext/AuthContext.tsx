import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export interface UserDataResponese {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: any[];
  followers: any[];
  following: any[];
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

interface GetUserDataYype {
  userData: null | User;
  setuserData: React.Dispatch<React.SetStateAction<null | User>>;
  getUserData: () => Promise<User | null>;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<GetUserDataYype>({
  userData: null,
  setuserData: () => {},
  getUserData: async (): Promise<null | User> => null,
  userToken: null,
  setUserToken: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setuserData] = useState<User | null>(null);
  // 1. إضافة userToken كـ State بياخد قيمته الابتدائية من localStorage
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("tkn")
  );

  async function getUserData(): Promise<User | null> {
    const token = localStorage.getItem("tkn");
    if (!token) return null;

    try {
      const baseUrl =
        import.meta.env.VITE_API_URL || import.meta.env.VITE_BASE_URL;

      const res = await axios.get<UserDataResponese>(
        `${baseUrl}/users/profile-data`,
        {
          headers: {
            token: token,
          },
        }
      );

      return res?.data?.data?.user || null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  // 2. الـ useEffect هنا بتشتغل كل ما قيمة userToken تتغير
  useEffect(() => {
    if (userToken) {
      getUserData().then((x) => setuserData(x));
    } else {
      setuserData(null);
    }
  }, [userToken]);

  const mo = {
    userData,
    setuserData,
    getUserData,
    userToken,
    setUserToken,
  };

  return <AuthContext.Provider value={mo}>{children}</AuthContext.Provider>;
}