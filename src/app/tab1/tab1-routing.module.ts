import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {TodoDetailComponent} from "../components/todo-detail/todo-detail.component";


const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'todo-detail/:id',
    component: TodoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
