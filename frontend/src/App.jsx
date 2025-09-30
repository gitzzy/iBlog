import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./pages/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/api/signup" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
