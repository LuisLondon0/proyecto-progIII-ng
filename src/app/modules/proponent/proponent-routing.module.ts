import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProponentCreationComponent } from './proponent-creation/proponent-creation.component';
import { ProponentEditionComponent } from './proponent-edition/proponent-edition.component';
import { ProponentListComponent } from './proponent-list/proponent-list.component';
import { RemoveProponentComponent } from './remove-proponent/remove-proponent.component';

const routes: Routes = [
  {
    path: "proponent-creation",
    component: ProponentCreationComponent
  },
  {
    path: "proponent-edition/:id",
    component: ProponentEditionComponent
  },
  {
    path: "proponent-list",
    component: ProponentListComponent
  },
  {
    path: "remove-proponent/:id",
    component: RemoveProponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProponentRoutingModule { }
