import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { UserProps } from './types/props';
import type { User } from './types/user';

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreateSnippet from "./components/Snippets/CreateSnippet";
import Snippets from "./components/Snippets/Snippets";
import Footer from "./components/footer";

import Logout from './components/Auth/Logout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const UserProps : UserProps = {
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
          <Route path="/create" element={<CreateSnippet {...UserProps} />} />
          <Route path="/snippets" element={<Snippets {...UserProps} />} />
          <Route path="/login" element={<Login {...UserProps}/>} />
          <Route path="/signup" element={<Signup {...UserProps} />} />
          <Route path="/logout" element={<Logout {...UserProps} />} />
        </Routes>

        <Footer />
    </>
  );
}


export default App;