import * as fromTodo from "../actions/todo.actions";
import {TodoState} from "../../types/types";

export const initialState: TodoState = {
  data: []
};

export function reducer(state = initialState, action: fromTodo.ActionsUnion): TodoState {
  switch (action.type) {
    case fromTodo.ActionTypes.CreateTodo: {
      return {
        ...state,
        data: [...state.data, action.payload.todo]
      };
    }
    case fromTodo.ActionTypes.DeleteTodo: {
      return {
        ...state,
        ...state.data.splice(state.data.indexOf(action.payload.todo), 1)
      };
    }
    default: {
      return state;
    }
  }
}
