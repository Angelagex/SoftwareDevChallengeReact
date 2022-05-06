import React, { useContext, useState } from "react";
import { GiTrashCan, GiPencil, GiCheckMark } from "react-icons/gi";
import { Store } from "./StoreProvider";

const ToDoTask = ({ task }) => {
  const { state, dispatch } = useContext(Store);
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')


  const fetchAllModules = async () => {
    let response = await fetch("http://localhost:8081/api/")
    let data = await response.json()
    return data
  }  

  const update = async () => {
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
  } 

  const handleCheck = async (task) => {
    let checked = task.done
    let taskWithCheckboxInformation = { ...task, done: !checked };

    let taskUpdatedPromise = await fetch(
      "http://localhost:8081/api/update/task",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskWithCheckboxInformation),
      }
    );

    let taskUpdated = await taskUpdatedPromise.json();

    dispatch({
      type: "update-task",
      payload: taskUpdated,
    });
    update()
  };

  const handleEdit = () => {
    setEdit(!edit)
  };
  
  const handleUpdate = async (task) => {
    let taskWithCheckboxInformation = { ...task, title: title };

    let taskUpdatedPromise = await fetch(
      "http://localhost:8081/api/update/task",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskWithCheckboxInformation),
      }
    );

    let taskUpdated = await taskUpdatedPromise.json();

    dispatch({
      type: "update-task",
      payload: taskUpdated,
    });

    update()
    setEdit(!edit)

  }

  const addTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDelete = async (task) => {
    let response = await fetch(`http://localhost:8081/api/delete/task/${task.id}`,{
    method: "DELETE"
  })
    if(response.status === 200){
      dispatch({
        type: "remove-task",
        payload: task
      })
    }
    update()
  }

  return (
    <div
      className="toDoTask"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={task.done ? {backgroundColor: "rgba(24, 155, 7, 0.311)"} : {}}
    >
      <input
        className="taskTitle"
        style={task.done ? {textDecoration: "line-through"} : {}}
        placeholder={task.title}
        disabled={!edit}
        onChange={addTitle}
      />
      {hover && !edit && (
        <>
          <button className="buttons" onClick={() => handleCheck(task)}>
            <GiCheckMark
              onPointerEnter={(e) => (e.target.style.color = task.done ? "red" : "green" )}
              onPointerLeave={(e) => (e.target.style.color = "black")}
            />
          </button>
          <button className="buttons" onClick={() => handleEdit()} disabled={task.done}>
            <GiPencil
              onPointerEnter={(e) => (e.target.style.color = "white")}
              onPointerLeave={(e) => (e.target.style.color = "black")}
            />
          </button>
          <button className="buttons" onClick={() => handleDelete(task)}>
            <GiTrashCan
              onPointerEnter={(e) => (e.target.style.color = "red")}
              onPointerLeave={(e) => (e.target.style.color = "black")}
            />
          </button>
        </>
      )}
      {hover && edit && <button className="buttons" onClick={() => handleUpdate(task)}>
            <GiCheckMark
              onPointerEnter={(e) => (e.target.style.color = "green")}
              onPointerLeave={(e) => (e.target.style.color = "black")}
            />
          </button>}
    </div>
  );
};

export default ToDoTask;
