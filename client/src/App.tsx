import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { PostBlog } from "./components/PostBlog";
import SignInCard from "./pages/Signin";
import { Userblogs } from "./pages/Userblogs";
import { Profile } from "./components/Profile";
import { Search } from "./pages/Search";
import { BlogPage } from "./pages/BlogPage";
import SignupPage from "./pages/Signup";
import { AllBlogs } from "./pages/AllBlogs";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/createblog" element={<PostBlog />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/signin" element={<SignInCard />} />
          <Route path="/:username/blogs" element={<Userblogs />} />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/blog/result" element={<Search />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/:username/allblogs" element={<AllBlogs />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
