import React from 'react'

const ToDoTask = ({task}) => {
  return (
    <div className='toDoTask'>
        <p>{task.title}</p>
        <button></button>
        <button></button>
    </div>
  )
}

export default ToDoTask