import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptRejectEvaluationComponent } from './accept-reject-evaluation/accept-reject-evaluation.component';
import { EvaluationCreationComponent } from './evaluation-creation/evaluation-creation.component';
import { EvaluationEditionComponent } from './evaluation-edition/evaluation-edition.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { RemoveEvaluationComponent } from './remove-evaluation/remove-evaluation.component';

const routes: Routes = [
  {
    path: "evaluation-creation",
    component: EvaluationCreationComponent
  },
  {
    path: "evaluation-edition/:id",
    component: EvaluationEditionComponent
  },
  {
    path: "evaluation-list",
    component: EvaluationListComponent
  },
  {
    path: "remove-evaluation/:id",
    component: RemoveEvaluationComponent
  },
  {
    path: "accept-reject-evaluation/:id",
    component: AcceptRejectEvaluationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
