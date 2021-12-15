import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationCreationComponent } from './evaluation-creation/evaluation-creation.component';
import { EvaluationEditionComponent } from './evaluation-edition/evaluation-edition.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { RemoveEvaluationComponent } from './remove-evaluation/remove-evaluation.component';
import { AcceptRejectEvaluationComponent } from './accept-reject-evaluation/accept-reject-evaluation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


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
    EvaluationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class EvaluationModule { }
