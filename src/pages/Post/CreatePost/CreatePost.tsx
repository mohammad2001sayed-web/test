import { Avatar, Button, Form, Input } from "@heroui/react";
import type { User } from "../../Login/login.interface";
import { DocumentUpload } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FnCreatPost } from "../CreatPost.abi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost({ user }: { user: User }) {
  const { name, photo } = user;
  const queryClient = useQueryClient();
  const upfile = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { body: "" },
  });

  const [postImage, setPostImage] = useState<File | null>(null);
  const [upUserImage, setUpUserImage] = useState<string>("");

  const { mutateAsync } = useMutation({
    mutationFn: FnCreatPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function CreateUserPost(data: { body: string }) {
    const formData = new FormData();
    if (data.body) formData.append("body", data.body);
    if (postImage) formData.append("image", postImage);

    toast.promise(mutateAsync(formData), {
      loading: "Creating post...",
      success: (res: any) => {
        reset();
        setPostImage(null);
        setUpUserImage("");
        return (
          <span className="text-green-700">
            {res?.data?.message || "Post created successfully!"}
          </span>
        );
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to create post",
    });
  }

  return (
    <div className="container mx-auto px-4">
      <div className="w-full bg-[#000d0d]/20 p-3 rounded-lg">
        <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-blue-900">
          <h2 className="text-amber-700 font-medium">
            Hello {name}, what is on your mind?
          </h2>
        </div>

        <Form onSubmit={handleSubmit(CreateUserPost)}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <Avatar.Image alt={name} src={photo} />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>

            <Input
              {...register("body")}
              className="grow"
              type="text"
              placeholder="Create your post..."
            />

            <DocumentUpload
              onClick={() => upfile.current?.click()}
              size="32"
              color="#FF8A65"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>

          {upUserImage && (
            <div className="mb-3">
              <img
                className="w-1/4 mx-auto rounded-2xl max-h-48 object-cover"
                src={upUserImage}
                alt="post preview"
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </Form>

        <input
          ref={upfile}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPostImage(file);
              setUpUserImage(URL.createObjectURL(file));
            }
          }}
          type="file"
          accept="image/*"
          hidden
        />
      </div>
    </div>
  );
}