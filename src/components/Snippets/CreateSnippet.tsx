import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


import CodeEditor from "../Playground/CodeEditor";
import KnowledgeTab from "../KnowledgeTab";

import type { UserProps } from "../../types/models";

function CreateSnippet(props : UserProps) {
  const { user , isAuthenticated } = props;

  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <div className="grid grid-cols-2 gap-2 rounded-lg m-4">

        <>
          <KnowledgeTab />
          <CodeEditor  />
        </>

      </div>
    </>
  );
}


export default CreateSnippet;

