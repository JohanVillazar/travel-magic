import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/RegisterUser";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./components/notfound/PageNotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./components/profile/profileUser";





function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<UserProfile/>} />
         
          

        </Routes>
      </ScrollToTop>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
