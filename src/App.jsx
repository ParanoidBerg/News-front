import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import "./app.module.css";
import Footer from "./components/Footer/Footer";
import News from "./pages/NewsPage/News";
import SignUp from "./pages/Join/SignUp";
import SignIn from "./pages/Join/SignIn";
import { useSelector } from "react-redux";
import Admin from "./pages/AdminPage/Admin";
import UserList from "./pages/AdminPage/UserList";

function App() {
  const token = useSelector((state) => state.auth.token);
  const admin = useSelector((state) => state.auth.admin);

  if (!token) {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:id" element={<Home />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  } else if (token && admin === "user") {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:id" element={<Home />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/signin" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/userList" element={<UserList />} />
            <Route path="/categories/:id" element={<Home />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/signin" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
