import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import './app.module.css'
import Body from "./components/home.body/Body";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import News from "./pages/NewsPage/News";

function App() {

  const news = useSelector((state)=>state.news.news)

  return (
    <>
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:id" element={<Home />}/>
        <Route path='/news/:id' element={<News />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
