import React, { useContext } from "react";
import ToDoTask from "./ToDoTask";

const Module = ({ module }) => {
  const { state, dispatch } = useContext(Store);

  return (
    <div
      className="module"
      style={module.done && { textDecoration: "line-through" }}
      key={module.id}
    >
      <h4>{module.title}</h4>
      <div>
          {
              state.listOfTasks.map(task => task.FkModuleKey === module.id && <ToDoTask task={task}/>)
          }
          </div>

      <input
        type="checkbox"
        checked={note.done}
        onChange={(e) => {
          onCheckbox(e, note);
        }}
      />
      <button onClick={(e) => onDelete(note)}>Delete</button>
    </div>
  );
};

export default Module;
