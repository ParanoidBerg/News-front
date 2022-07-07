import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Header from "./components/Header";
import './app.module.css'

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
