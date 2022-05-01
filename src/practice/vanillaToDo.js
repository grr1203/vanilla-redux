import { createStore } from "redux";

/*
<h1>To Dos</h1>
<form>
  <input type="text" placeholder="Write to do" />
  <button>Add</button>
</form>
<ul></ul>
*/

const form = document.querySelector("form");
const input = form.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, id: Date.now(), text };
};
const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ id: action.id, text: action.text }, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return [];
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  ul.innerText = "";

  const toDos = store.getState();
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
