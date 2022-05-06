import React, { useContext, useEffect } from "react";
import Form from "./Form";
import Module from "./Module";
import { Store } from "./StoreProvider";

const ToDoModule = () => {
  const {state, dispatch} = useContext(Store)


  useEffect(() => {
    fetchAllModules().then( modules => {
      let tasks = []
      modules.map( module => tasks.push(...module.tasks))
      let action = {
        type: "get-modules",
        payload: modules
      } 
      let action2 = {
        type: "get-tasks",
        payload: tasks
      } 
      dispatch(action)
      dispatch(action2)

    })
  }, [])

  const fetchAllModules = async () => {
    let response = await fetch("http://localhost:8081/api/")
    let data = await response.json()
    return data
  }  

  return (
    <div className="toDoModule">
      <Form />
      <div className="modulesContainer">
        {state.listOfModules.map( (module, idx) => (
            <Module module={module} key={idx}/>
        ))}
      </div>
    </div>
  );
};

export default ToDoModule;
