import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { usernameatom } from "../atoms/usernameatom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExploreIcon from "@mui/icons-material/Explore";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(usernameatom);
  const username = typeof user === "object" && user?.username ? user.username : "";

  return (
    <nav className="bg-amber-900 text-white p-4 flex justify-end items-center rounded-lg">
      <button
        title="Home"
        onClick={() => navigate(username ? `/${username}/blogs` : "/")}
        className="hover:text-gray-300 mr-8 rounded-lg"
      >
        <FaHome />
      </button>
      <button
        title="Explore"
        onClick={() => navigate(username ? `/${username}/allblogs` : "/")}
        className="hover:text-gray-300 mr-8 rounded-lg"
      >
        <ExploreIcon />
      </button>
      <button
        title="Dark Mode"
        onClick={() => navigate("/theme")}
        className="hover:text-gray-300 mr-8 rounded-lg"
      >
        <DarkModeIcon />
      </button>
      <button
        title="Profile"
        onClick={() => navigate(username ? `/${username}/profile` : "/")}
        className="hover:text-gray-300"
      >
        <CgProfile />
      </button>
    </nav>
  );
};

export default Navbar;
