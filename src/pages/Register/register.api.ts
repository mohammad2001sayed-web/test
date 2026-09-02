import axios from "axios";
import type { RigisterResponse } from "./register.interface";
import type { RegisterDataForm } from "./rigester.validation";

export async function sendUserRigister(userData: RegisterDataForm) {
  try {
    const res = await axios.post<RigisterResponse>(
      `${import.meta.env.VITE_BASE_URL}/users/signup`,
      userData,
    );
    console.log(res.data.message);
    return res.data.message; //string
  } catch (error) {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }

  throw new Error("Something went wrong");
}
}
