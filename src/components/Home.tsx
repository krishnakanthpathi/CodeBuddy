import CodeEditor from "./CodeEditor";
import KnowledgeTab from "./KnowledgeTab";

function Home() {
  return (
    <>
        <div className="bg-red-100 flex space-x-4 p-4 rounded-lg m-4">
            <KnowledgeTab />
            <CodeEditor />
        </div>
    </>
  );
}

export default Home;