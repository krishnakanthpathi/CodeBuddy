import CodeEditor from "./Playground/CodeEditor";
import KnowledgeTab from "./KnowledgeTab";

function CreateSnippet() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 rounded-lg m-4">
        <KnowledgeTab />
        <CodeEditor />
      </div>
    </>
  );
}


export default CreateSnippet;

