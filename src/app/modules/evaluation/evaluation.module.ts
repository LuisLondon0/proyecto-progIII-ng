import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationCreationComponent } from './evaluation-creation/evaluation-creation.component';
import { EvaluationEditionComponent } from './evaluation-edition/evaluation-edition.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { RemoveEvaluationComponent } from './remove-evaluation/remove-evaluation.component';
import { AcceptRejectEvaluationComponent } from './accept-reject-evaluation/accept-reject-evaluation.component';


@NgModule({
  declarations: [
    EvaluationCreationComponent,
    EvaluationEditionComponent,
    EvaluationListComponent,
    RemoveEvaluationComponent,
    AcceptRejectEvaluationComponent
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
