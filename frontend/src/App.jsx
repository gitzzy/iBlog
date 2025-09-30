import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import { userContext } from "./components/UserContext";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const logout = () => {
    setUser(null)
    localStorage.setItem('user','')
  };

  return (
    <>
      <userContext.Provider value={{ user, setUser,logout}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/api/signup" element={<Signup />}></Route>
            <Route
              path="/api/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
