import CreateSnippet from "./components/CreateSnippet";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Snippets from "./components/Snippets";


function App() {
  return (
    <>
        <Navbar />
        <Home />
        <CreateSnippet />
        <Snippets />
    </>
  );
}


export default App;