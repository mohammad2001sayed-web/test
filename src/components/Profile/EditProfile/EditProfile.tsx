import { Avatar, Button, Card, Input, Label } from "@heroui/react";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/CounterContext/AuthContext/AuthContext";

export default function EditProfile() {
  const { userData, setuserData, getUserData } = useContext(AuthContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Photo
  const [loading, setLoading] = useState(false);

  // Password
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // =========================
  // Change Photo
  // =========================

  function handleChangePhoto() {
    fileInputRef.current?.click();
  }

  async function uploadPhoto(file: File) {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("photo", file);

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      const updatedUser = await getUserData();

      setuserData(updatedUser);

      alert("Profile picture updated successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Change Password
  // =========================

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      console.log(res.data);

      // لو الـ API رجع Token جديد
      if (res.data.data?.token) {
        localStorage.setItem("tkn", res.data.data.token);
      }

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");

      alert("Password changed successfully");
    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  // =========================
  // Loading
  // =========================

  if (!userData) {
    return <p>Loading...</p>;
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen pt-24 pb-10 bg-[#0b957a]">
      <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto ">

        <Card className="p-6 bg-[#09c] ">

          <h1 className="text-3xl font-bold mb-8">
            Edit Profile
          </h1>

          {/* =========================
              Profile Picture
          ========================= */}

          <div className="flex flex-col items-center gap-4">

            <Avatar className="w-32 h-32">
              <Avatar.Image
                src={userData.photo}
                alt={userData.name}
              />

              <Avatar.Fallback>
                {userData.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar>

            <Button
              onClick={handleChangePhoto}
              isDisabled={loading}
              className="bg-amber-300"
            >
              {loading
                ? "Uploading..."
                : "Change Profile Picture"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  uploadPhoto(file);
                }
              }}
            />

          </div>

          {/* =========================
              Change Password
          ========================= */}

          <form
            onSubmit={changePassword}
            className="mt-10 flex flex-col gap-4"
          >

            <h2 className="text-2xl font-bold">
              Change Password
            </h2>

            <div  className="flex flex-col gap-2">
              <Label>Current Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Current password"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>New Password</Label>

              <Input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="New password"
                required
              />
            </div>

            <div  className="flex flex-col gap-2">
              <Label>Confirm New Password</Label>

              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                required
              />
            </div>

            <Button
              type="submit"
              isDisabled={passwordLoading}
              className="bg-violet-500 text-white btn-2 w-full"
            >
              {passwordLoading
                ? "Changing..."
                : "Change Password"}
            </Button>

          </form>

        </Card>

      </div>
    </div>
  );
}