import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Store } from "./StoreProvider";
import ToDoTask from "./ToDoTask";

const Module = ({ module }) => {
  const { state, dispatch } = useContext(Store);

  const [formValue, handleInputChange, reset] = useForm({
    title: "",
    done: false,
    fkModuleId: module.id,
  });

  const { title } = formValue;

  const handleSave = (e) => {
    e.preventDefault();
    console.log(formValue);
  };

  return (
    <div
      className="module"
      style={module.done && { textDecoration: "line-through" }}
      key={module.id}
    >
      <h4>{module.title}</h4>
      <div>
        {state.listOfTasks.map(
          (task, idx) => task.fkModuleId === module.id && <ToDoTask task={task} key={idx}/>
        )}
        <div className="toDoTask">
          <form onSubmit={(e) => handleSave(e)}>
            <input
              id="title"
              type="text"
              name="title"
              className="titleInput"
              placeholder="Add a New Task"
              value={title}
              onChange={handleInputChange}
            />
            <button type="submit" className="submitBtn">
              Add
            </button>
          </form>
        </div>
      </div>


    </div>
  );
};

export default Module;
