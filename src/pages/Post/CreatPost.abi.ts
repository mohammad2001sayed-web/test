import axios from "axios";
import type { CreatPostResponse } from "./CreatPost.interface";


// ==============================
// Create Post
// ==============================

export async function FnCreatPost(
  formData: FormData
): Promise<string> {
  try {
    const res = await axios.post<CreatPostResponse>(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("tkn") || "",
        },
      }
    );

    return res.data.message;

  } catch (error) {

    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(
        error.response?.data?.message ||
        "Failed to create post"
      );
    }

    throw new Error("Network Error");
  }
}


// ==============================
// Update Post
// ==============================

export async function FnUpdatePost(
  postId: string,
  body?: string,
  file?: File
) {
  const formData = new FormData();

  // ابعت body فقط لو فيه نص
  if (body?.trim()) {
    formData.append("body", body.trim());
  }

  // ابعت image فقط لو فيه صورة جديدة
  if (file) {
    formData.append("image", file);
  }

  return axios.put(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
    formData,
    {
      headers: {
        token: localStorage.getItem("tkn") || "",
      },
    }
  );
}

// delete post

export async function FnDeletePost(postId: string) {
  return axios.delete(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
    {
      headers: {
        token: localStorage.getItem("tkn") || "",
      },
    }
  );
}