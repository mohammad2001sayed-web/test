import axios from 'axios';
import type { CreatPostResponse } from './CreatPost.interface';

// تحديد الـ Base URL بشكل آمن للتوافق مع أي اسم في .env
const getBaseUrl = () => import.meta.env.VITE_API_URL || import.meta.env.VITE_BASE_URL || "https://route-posts.routemisr.com";

export async function FnCreatPost(formData: FormData): Promise<string> {
  try {
    const res = await axios.post<CreatPostResponse>(
      `${getBaseUrl()}/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem('tkn') || '',
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
    `${getBaseUrl()}/posts/${postId}`,
    formData,
    {
      headers: {
        token: localStorage.getItem("tkn") || "",
      },
    }
  );
}