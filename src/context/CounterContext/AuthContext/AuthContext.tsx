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
}

export const AuthContext = createContext<GetUserDataYype>({
  userData: null,
  setuserData: () => {},
  getUserData: async (): Promise<null | User> => {
    return null;
  },
});
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userData, setuserData] = useState<User | null>(null);

  async function getUserData(): Promise<User | null> {
    if (localStorage.getItem("tkn")) {
      const res = await axios.get<UserDataResponese>(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        },
      );
      return res.data.data.user;
    } else {
      return null;
    }
  }
  useEffect(() => {
    getUserData().then(function (x) {
      setuserData(x);
    });
  }, []);

const mo = {
  userData,
  setuserData,
  getUserData,
};

return (
  <AuthContext.Provider value={mo}>
    {children}
  </AuthContext.Provider>
);
}