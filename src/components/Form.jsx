import React from 'react'
import { useForm } from '../hooks/useForm';

const Form = () => {

    const [formValue, handleInputChange, reset] = useForm({
        title: "",
      });
    
      const { title } = formValue;
    
      const handleSave = (e) => {
          e.preventDefault()
          console.log(formValue);
      }
      
  return (
    <div className="formContainer">
        <form onSubmit={(e) => handleSave(e)}>
          <label className="titleLabel">Add a new Task's Module</label>
          <input
            id="title"
            type="text"
            name="title"
            className="titleInput"
            placeholder="Name of Module"
            value={title}
            onChange={handleInputChange}
          />
          <button type="submit" className="submitBtn">
            Add
          </button>
        </form>
      </div>
  )
}

export default Form