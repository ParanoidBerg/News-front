import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import './app.module.css'
import Footer from "./components/Footer/Footer";
import News from "./pages/NewsPage/News";
import SignUp from "./pages/Join/SignUp";
import SignIn from "./pages/Join/SignIn";

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:id" element={<Home />}/>
        <Route path='/news/:id' element={<News />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
