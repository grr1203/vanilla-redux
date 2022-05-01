import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo } from "../store";

function Home() {
  const [text, setText] = useState();
  const toDos = useSelector((state) => state.toDoReducer);
  const dispatch = useDispatch();

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText("");
    dispatch(addToDo(text));
  }

  function onClickDel(e) {
    dispatch(deleteToDo(parseInt(e.target.parentNode.id)));
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => {
          return (
            <li id={toDo.id} key={toDo.id}>
              {toDo.text}
              <button onClick={onClickDel}>DEL</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
