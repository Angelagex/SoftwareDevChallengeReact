import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { Store } from "./StoreProvider";
import ToDoTask from "./ToDoTask";
import { GiCheckMark, GiTrashCan } from "react-icons/gi";

const Module = ({ module }) => {
  const { state, dispatch } = useContext(Store);
  const [hover, setHover] = useState(false);

  const fetchAllModules = async () => {
    let response = await fetch("http://localhost:8081/api/");
    let data = await response.json();
    return data;
  };

  const [formValue, handleInputChange, reset] = useForm({
    title: "",
    done: false,
    fkModuleId: module.id,
  });

  const { title, done, fkModuleId } = formValue;

  const handleSave = async (e) => {
    e.preventDefault();
    if (title) {
      let notSavedPromise = await fetch(
        "http://localhost:8081/api/create/task",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formValue),
        }
      );

      let notSaved = await notSavedPromise.json();
      dispatch({
        type: "add-task",
        payload: notSaved,
      });
      reset();
      update()
    }
  };

  const update = () => {
    fetchAllModules().then((modules) => {
      let tasks = [];
      modules.map((module) => tasks.push(...module.tasks));
      let action = {
        type: "get-modules",
        payload: modules,
      };
      let action2 = {
        type: "get-tasks",
        payload: tasks,
      };
      dispatch(action);
      dispatch(action2);
    });
  } 

  const handleDelete = async (module) => {
    let response = await fetch(`http://localhost:8081/api/delete/module/${module.id}`,{
    method: "DELETE"
  })
    if(response.status === 200){
      dispatch({
        type: "remove-task",
        payload: module
      })
    }
    update()
  }


  return (
    <div
      className="module"
      key={module.id}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="titleHeader">
        <h4 className="moduleTitle">{module.title}</h4>
        {hover && (
          <button className="buttons" onClick={() => handleDelete(module)}>
            <GiTrashCan
              onPointerEnter={(e) => (e.target.style.color = "red")}
              onPointerLeave={(e) => (e.target.style.color = "black")}
            />
          </button>
        )}
      </div>
      <div>
        {state.listOfTasks.map(
          (task, idx) =>
            task.fkModuleId === module.id && <ToDoTask task={task} key={idx} />
        )}
        <div>
          <form onSubmit={(e) => handleSave(e)} className="toDoTask">
            <input
              id="title"
              type="text"
              name="title"
              className="titleInput"
              placeholder="Add a New Task"
              value={title}
              onChange={handleInputChange}
            />
            <button className="buttons" type="submit">
              <GiCheckMark
                onPointerEnter={(e) => (e.target.style.color = "green")}
                onPointerLeave={(e) => (e.target.style.color = "black")}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Module;
