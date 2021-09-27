import {TodoState} from "../../types/types";

export const getTodos = (state: TodoState) => state.data;

export const getTodoById = (state: TodoState, props: {id: string}) => {
  return state.data.find(todo => todo.id === props.id)};


