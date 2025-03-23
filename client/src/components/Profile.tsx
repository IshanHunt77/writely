import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { dpatom } from "../atoms/dpatom";
import { Card } from "./ui/card";

interface ProfileResponse {
  userinfo: {
    username: string;
    profilePhoto: string;
  };
}

export const Profile = () => {
  const [dp, setDP] = useRecoilState(dpatom);
  const [profileImagelink, setProfileImagelink] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultImage = "/EmptyImage.png";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userInfo = await axios.get<ProfileResponse>(
          "https://writely-backend-2fw2.onrender.com/profile/user",
          { withCredentials: true }
        );
        setProfileImagelink(userInfo.data.userinfo?.profilePhoto || null);
        setUsername(userInfo.data.userinfo?.username || "Guest");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleProfilePhoto = async () => {
    try {
      let imageUrl = "";
      if (dp.file) {
        const formData = new FormData();
        formData.append("images", dp.file);
        const imgRes = await axios.post<{ imageLink: string }>(
          "https://writely-backend-2fw2.onrender.com/profile/upload",
          formData
        );
        imageUrl = `https://writely-backend-2fw2.onrender.com${imgRes.data.imageLink}`;
      }
      const profileres = await axios.post(
        "https://writely-backend-2fw2.onrender.com/profile/updateprofile",
        { profilePhoto: imageUrl },
        { withCredentials: true }
      );
      setDP({ file: null, imageUrl: imageUrl });
      setProfileImagelink(imageUrl);
      console.log(profileres.data);
    } catch (error) {
      console.error("Error updating profile photo:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      <Card className="w-[300px] bg-yellow-50 shadow-lg rounded-lg p-8 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">{username}</h2>
        <img
          src={profileImagelink || defaultImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
        />
        <div className="flex flex-col items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setDP({
                  file: selectedFile,
                  imageUrl: URL.createObjectURL(selectedFile),
                });
              }
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-md transition shadow-md"
          >
            Change Image
          </button>
          <button
            onClick={handleProfilePhoto}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-md transition shadow-md"
          >
            Update Profile
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
