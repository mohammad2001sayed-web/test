// import axios from "axios";

// async function updatePost(postId: string, file?: File) {
//   const formData = new FormData();

//   formData.append("body", "Updated text with mention @route_user");

//   if (file) {
//     formData.append("image", file);
//   }

//   await axios.put(
//     `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
//     formData,
//     {
//       headers: {
//         token: localStorage.getItem("tkn"),
//       },
//     }
//   );
// }