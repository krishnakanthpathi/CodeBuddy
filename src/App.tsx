import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreateSnippet from "./components/CreateSnippet";
import Snippets from "./components/Snippets";
import Footer from "./components/footer";

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';



function App() {
  return (
    <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippets" element={<Snippets />} />
          {/* <Route path="/snippets/:id" element={<Snippets />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
    </>
  );
}


export default App;