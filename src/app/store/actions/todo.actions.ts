import { Action } from "@ngrx/store";
import {Todo} from "../../types/types";

export enum ActionTypes {
  CreateTodo = "[Todo Service] Create todo",
  DeleteTodo = "[Todo Service] Delete todo",
}
export class CreateTodo implements Action {
  readonly type = ActionTypes.CreateTodo;
  constructor(public payload: { todo: Todo }) {}
}
export class DeleteTodo implements Action {
  readonly type = ActionTypes.DeleteTodo;
  constructor(public payload: { todo: Todo }) {}
}
export type ActionsUnion = CreateTodo | DeleteTodo ;
