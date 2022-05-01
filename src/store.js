import { createStore, combineReducers } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addToDo = (text) => {
  return {
    type: ADD,
    id: Date.now(),
    text,
  };
};
export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const toDoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, { id: action.id, text: action.text }];
    case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const rootReducer = combineReducers({ toDoReducer });

const store = createStore(rootReducer);

export default store;
