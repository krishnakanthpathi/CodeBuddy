import CodeEditor from "../Playground/CodeEditor";
import KnowledgeTab from "../KnowledgeTab";

import type { UserProps } from "../../types/models";
import { useEffect } from "react";

function CreateSnippet(props : UserProps) {
  // const { user, isAuthenticated } = props;
  
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

