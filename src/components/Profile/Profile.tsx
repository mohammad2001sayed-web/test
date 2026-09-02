import { Avatar, Card } from "@heroui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/CounterContext/AuthContext/AuthContext";
import type { AllPostRisponse } from "../../pages/Post/Post.interface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../pages/Post/PostCard/PostCard";
import { Link } from "react-router";

export default function Profile() {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <p>Loading...</p>;
  }
  function getUserPosts() {
    return axios.get<AllPostRisponse>(
      `${import.meta.env.VITE_BASE_URL}/users/${userData?._id}/posts`,
      {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      },
    );
  }

  const { data: posts, isLoading } = useQuery({
    queryKey: ["UserPosts", userData?._id],
    queryFn: getUserPosts,
    select: (data) => data.data.data.posts,
    enabled: !!userData?._id,
  });

  return (
    <div className="w-full overflow-hidden py-4 bg-slate-900 bg-[linear-gradient(30deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(150deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(300deg,#1e293b_25%,transparent_25.5%,transparent_75%,#1e293b_75.5%,#1e293b),linear-gradient(60deg,#1e293b_25%,transparent_25.5%,transparent_75%,#1e293b_75.5%,#1e293b),linear-gradient(180deg,#0f172a_15%,transparent_15.5%,transparent_85%,#0f172a_85.5%,#0f172a),linear-gradient(270deg,#0f172a_15%,transparent_15.5%,transparent_85%,#0f172a_85.5%,#0f172a)] bg-size-[80px_140px] bg-center">
      <div className="my-24 w-9/12 mx-auto">
        {/* Cover */}
        <Card className="overflow-hidden bg-gray-400 dark:bg-olive-500 dark:text-amber-950 text-violet-800">
          <div className="h-64">
            <img
              src={userData.photo}
              alt="Cover"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* User Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between">
              {/* Avatar */}
              <div className="-mt-16">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <Avatar.Image src={userData.photo} alt={userData.name} />
                  <Avatar.Fallback>{userData.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </div>

              {/* Edit */}
              <Link to="/Profile/Edit">
                <button type="button" className="Btn ">
                 
                </button>
              </Link>
            </div>

            {/* Name */}
            <div className="mt-4">
              <h1 className="text-3xl font-bold">{userData.name}</h1>

              <p className="text-gray-900">@{userData.username}</p>
              <p className="text-gray-900">@{userData.email}</p>
            </div>

            {/* Statistics */}
            <div className="flex gap-10 mt-6">
              <div>
                <p className="text-xl font-bold">{userData.followersCount}</p>

                <p className="dark:text-sky-300 text-amber-300">Followers</p>
              </div>

              <div>
                <p className="text-xl font-bold">{userData.followingCount}</p>

                <p className="dark:text-sky-300 text-amber-300">Following</p>
              </div>

              <div>
                <p className="text-xl font-bold">{userData.bookmarksCount}</p>

                <p className="dark:text-sky-300 text-amber-300">Bookmarks</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="mt-8">
          
          {/* <h2 className="text-4xl mb-4 font-extrabold text-blue-600 [text-shadow:0_4px_0_#1d4ed8,0_8px_13px_rgba(0,0,0,0.4)]">My Posts</h2> */}




    <div className="flex items-center justify-center min-h-50 perspective-[1000px]">
      <h2 
        className="
          text-5xl font-black text-white bg-teal-500 px-8 py-4 rounded-xl shadow-2xl
          border-2 border-teal-600 cursor-pointer
          
          /* تأثير الـ 3D والتحويلات */
          transform-3d 
          transition-transform duration-500 ease-out
          
          /* الحركة عند تمرير الماوس */
          hover:transform-[rotateX(20deg)_rotateY(-20deg)_translateZ(30px)]
          hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]
        "
      >
        {/* نص بارز من الداخل بـ 3D إضافي */}
        <span className="block transform-[translateZ(40px)]">
          My Posts
        </span>
      </h2>
    </div>











          

          {/* هنا هنجيب بوستات اليوزر بعدين */}
          {isLoading ? (
            <p>Loading posts...</p>
          ) : posts && posts.length > 0 ? (
            <div className="flex flex-col gap-5">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-200 text-4xl">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
