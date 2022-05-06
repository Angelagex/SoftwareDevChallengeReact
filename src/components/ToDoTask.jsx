import React, { useState } from "react";
import { GiTrashCan, GiPencil, GiCheckMark } from "react-icons/gi";

const ToDoTask = ({ task }) => {

  const [hover, setHover] = useState(false)


  return (
    <div className="toDoTask" onPointerEnter={() => setHover(true)} 
    onPointerLeave={() => setHover(false)}>
      <p className="taskTitle">{task.title}</p>
      {hover && <><button className="buttons">
        <GiCheckMark onPointerEnter={(e) => (e.target.style.color = "green")} 
        onPointerLeave={(e) => (e.target.style.color = "black")}/>
      </button>
      <button className="buttons">
        <GiPencil onPointerEnter={(e) => (e.target.style.color = "white")} 
        onPointerLeave={(e) => (e.target.style.color = "black")}/>
      </button>
      <button className="buttons">
        <GiTrashCan onPointerEnter={(e) => (e.target.style.color = "red")} 
        onPointerLeave={(e) => (e.target.style.color = "black")}/>
      </button></>}
    </div>
  );
};

export default ToDoTask;
