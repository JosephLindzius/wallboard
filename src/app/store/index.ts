import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, props} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTodoReducers from '../store/reducers/todo.reducer'
import * as fromTodoSelectors from '../store/selectors/todo.selectors'
import {TodoState} from "../types/types";
import {sendMessageToWorker} from "@angular/compiler-cli/ngcc/src/execution/cluster/utils";
import {from} from "rxjs";


export interface AppState {
  todos: TodoState
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodoReducers.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getTodoState = (state: AppState) => state.todos;

export const getAllTodos = createSelector(
  getTodoState,
  fromTodoSelectors.getTodos
);
export const getTodoById = (id: string) => createSelector(
  getTodoState,
  (TodoState)=> fromTodoSelectors.getTodoById(TodoState, {id: id})
);
