import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Store } from "./StoreProvider";

const Form = () => {
  const [formValue, handleInputChange, reset] = useForm({
    title: "",
  });
  const { title } = formValue;
  const {state, dispatch} = useContext(Store)


  const handleSave = async (e) => {
    e.preventDefault();
    if (title) {
      let notSavedPromise = await fetch(
        "http://localhost:8081/api/create/module",
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
        type: "add-module",
        payload: notSaved,
      });
      reset();
    }
  };

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
  );
};

export default Form;
