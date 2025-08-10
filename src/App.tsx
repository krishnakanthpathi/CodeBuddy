import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreateSnippet from "./components/CreateSnippet";
import Snippets from "./components/Snippets";
import Footer from "./components/footer";

import Logout from './components/Auth/Logout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

interface User {
  id: string;
  username: string;
  password: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const UserProps = {
    isAuthenticated,
    user,
    setUser,
    setIsAuthenticated
  };
  return (
    <>
        <Navbar {...UserProps} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout {...UserProps} />} />
        </Routes>
        <Footer />
    </>
  );
}


export default App;