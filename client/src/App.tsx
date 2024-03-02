import { useState, useEffect } from "react";

import { Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home.js";
import Navbar from "./components/navbar/Navbar.js";
import Error from "./components/404/Error.js";
import Signup from "./components/signup/Signup.js";
import Signin from "./components/signin/Signin.js";
import Table from "./components/table/Table.js";
import Scores from "./components/scores/Scores.js";

function App(): JSX.Element {

  const [isAuth, setIsAuth] = useState(false);
  
  
  useEffect(() => {
    fetch("http://localhost:3000/api/check", { credentials: 'include' })
      .then((data) => data.json())
      .then((data) => { setIsAuth(data) })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navbar setIsAuth={setIsAuth} isAuth={isAuth} />}>
        <Route index element={<Home />} />
        <Route path="/game" element={<Table/>} />
        <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
        <Route path="/signin" element={<Signin setIsAuth={setIsAuth} />} />
        <Route path="*" element={<Error />} />
        <Route path="/scores" element={<Scores />} />
      </Route>
    </Routes>
  );
}

export default App;
