  import { Avatar, Card } from "@heroui/react";
  import type { Post } from "../Post.interface";
  import { Like1, MessageText, Share } from "iconsax-react";
  import Coment from "../../../components/Coment/Coment";
  import { Link } from "react-router";
  import { AuthContext } from "../../../context/CounterContext/AuthContext/AuthContext";
  import { useContext, useState } from "react";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import toast from "react-hot-toast";
  import { FnUpdatePost } from "../CreatPost.abi";

  export default function PostCard({
    post,
    PostDetails,
  }: {
    post: Post;
    PostDetails?: boolean;
  }) {
    const { userData } = useContext(AuthContext);
    const {
      _id,
      commentsCount,
      createdAt,
      user: { name, photo },
      body,
      image,
      topComment,
    } = post;
    const isMyPost = userData?.id === post.user._id;

    console.log(isMyPost);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBody, setUpdatedBody] = useState(body || "");
    const queryClient = useQueryClient();

  const { mutateAsync: updatePost } = useMutation({
    mutationFn: ({
      postId,
      body,
    }: {
      postId: string;
      body: string;
    }) => FnUpdatePost(postId, body),

onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["allPost"] });
  queryClient.invalidateQueries({ queryKey: ["PostDetails", _id] });

  setIsEditing(false);
},  });
    return (
      <div className="container mx-auto px-4">
        <Card className="w-full dark:bg-[#18181B] bg-gray-200">
          <Card.Header>
            <Card.Title className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-blue-900">
              <Avatar>
                <Avatar.Image alt={name} src={photo} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>

              <div>
                <h2>{name}</h2>

                <p>
                  {new Date(createdAt).toLocaleDateString().replace(/\//g, "-")}
                </p>
              </div>
            </Card.Title>
            {isMyPost && !isEditing && (
              <button
                type="button"
                className="ml-auto dark:border-[#00ffe5] py-1 btn-178 my-3 "
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </button>
            )}

            <div>
              {image && <img className="w-full" src={image} alt={name} />}

              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <input
                    value={updatedBody}
                    onChange={(e) => setUpdatedBody(e.target.value)}
                    className="w-full p-3 rounded border"
                    type="text"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded"
                      onClick={() => {
                        toast.promise(
                          updatePost({
                            postId: _id,
                            body: updatedBody,
                          }),
                          {
                            loading: "Updating post...",
                            success: "Post updated successfully!",
                            error: (err) =>
                              err?.response?.data?.message ||
                              "Failed to update post",
                          },
                        );
                      }}
                    >
                      Update
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setUpdatedBody(body || "");
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>{" "}
                  </div>
                </div>
              ) : (
                <p className="italic text-zinc-900 dark:text-zinc-200 leading-loose wrap-break-word whitespace-normal overflow-wrap-break-word">
                  {body}
                </p>
              )}
            </div>
          </Card.Header>

          <Card.Footer className="py3 mt-3 border-t border-violet-500">
            <div className="flex justify-between w-full my-3">
              <div className="flex gap-2.5">
                <Like1 size={40} color="#092" />
                <Share size={40} color="#092" />
              </div>

              <div className="flex items-center gap-3 text-amber-400">
                {!PostDetails && (
                  <Link
                    className="flex gap-3 items-center"
                    to={`/PostDetails/${_id}`}
                  >
                    <span className="text-blue-800">{commentsCount}</span>
                    <MessageText size={40} color="#2dc442" />
                    show all coment
                  </Link>
                )}
              </div>
            </div>
          </Card.Footer>

          {/* Top Comment */}
          {topComment && !PostDetails && <Coment comment={topComment} />}
        </Card>
      </div>
    );
  }
