import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoveRequestComponent } from './remove-request/remove-request.component';
import { RequestCreationComponent } from './request-creation/request-creation.component';
import { RequestEditionComponent } from './request-edition/request-edition.component';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  {
    path: "request-creation",
    component: RequestCreationComponent
  },
  {
    path: "request-edition",
    component: RequestEditionComponent
  },
  {
    path: "request-list",
    component: RequestListComponent
  },
  {
    path: "remove-request",
    component: RemoveRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
