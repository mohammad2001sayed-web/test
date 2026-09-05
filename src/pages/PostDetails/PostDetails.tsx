import axios from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CreateComment from "../PostDetails/CreateComment/CreateComment";
import type {
  PostDetailsRisponse,
  CommentsResponse,
} from "./PostDetails.interface";

import Loding from "../../components/Loding/Loding";
import PostCard from "../Post/PostCard/PostCard";
import Coment from "../../components/Coment/Coment";
// import { FieldError, Input, Label, TextField } from "@heroui/react";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  // =========================
  // Get Single Post
  // =========================
  function getSinglePost() {
    return axios.get<PostDetailsRisponse>(
      `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      },
    );
  }

  // =========================
  // Get All Comments
  // =========================
  function getComments() {
    return axios.get<CommentsResponse>(
      `${import.meta.env.VITE_BASE_URL}/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      },
    );
  }

  // =========================
  // Post Query
  // =========================
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postErrorMessage,
  } = useQuery({
    queryKey: ["PostDetails", id],
    queryFn: getSinglePost,
    select: (data) => data.data.data.post,
    enabled: !!id,
  });

  // =========================
  // Comments Query
  // =========================
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorMessage,
  } = useQuery({
    queryKey: ["PostComments", id],
    queryFn: getComments,
    select: (data) => data.data.data.comments,
    enabled: !!id,
  });

  // =========================
  // Loading
  // =========================
  if (postLoading || commentsLoading) {
    return <Loding />;
  }

  // =========================
  // Post Error
  // =========================
  if (postError) {
    return (
      <h1 className="text-3xl text-red-700">{postErrorMessage.message}</h1>
    );
  }

  // =========================
  // Comments Error
  // =========================
  if (commentsError) {
    return (
      <h1 className="text-3xl text-red-700">{commentsErrorMessage.message}</h1>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="my-22 w-9/12 mx-auto">
      {/* Post */}
      {postData && <PostCard post={postData} PostDetails />}

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-5">Comments</h2>

        {commentsData && commentsData.length > 0 ? (
          <div className="flex flex-col gap-4">
            {commentsData.map((comment) => (
              <Coment key={comment._id} comment={comment} postId={id!} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No comments yet.</p>
        )}

        <CreateComment postId={id!} />
      </div>
    </div>
  );
}
