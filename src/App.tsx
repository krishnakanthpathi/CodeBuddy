import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreateSnippet from "./components/CreateSnippet";
import Snippets from "./components/Snippets";
import Footer from "./components/footer";


function App() {
  return (
    <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippets" element={<Snippets />} />
        </Routes>
        <Footer />
    </>
  );
}


export default App;