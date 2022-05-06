import React, { useContext } from "react";
import Form from "./Form";
import { Store } from "./StoreProvider";

const ToDoModule = () => {
  const { state, dispatch } = useContext(Store);

  return (
    <div className="toDoModule">
      <Form />
      <div className="modulesContainer">
        {state.listOfModules.map( module => (
            <Module module={module}/>
        ))}

      </div>
    </div>
  );
};

export default ToDoModule;
