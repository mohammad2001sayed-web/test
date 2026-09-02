import axios from 'axios';
import type { CreatPostResponse } from './CreatPost.interface';

export async function FnCreatPost(formData: FormData): Promise<string> {
  try {
    // 👈 1. تعديل المسار إلى /posts بحروف صغيرة
    const res = await axios.post<CreatPostResponse>(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData, // 👈 2. إرسال FormData مباشرة
      {
        headers: {
          token: localStorage.getItem('tkn') || '',
          // Axios بيحدد الـ Content-Type لـ multipart/form-data تلقائياً عند استخدام FormData
        },
      }
    );

    return res.data.message;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
    throw new Error('Network Error');
  }
}
export async function FnUpdatePost(
  postId: string,
  body: string,
  file?: File
) {
  const formData = new FormData();

  formData.append("body", body);

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