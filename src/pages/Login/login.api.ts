import axios from "axios";
import type { LoginResponse } from "./login.interface";
import type { LoginDataForm } from "./Login.validation";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://route-posts.routemisr.com";
export async function sendUserLogin(userData: LoginDataForm) {
  try {
    const res = await axios.post<LoginResponse>(
      `${BASE_URL}/users/signin`,
      userData
    );
    return res;
  } catch (error) {
    throw error;
  }
}