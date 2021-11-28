import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RequestByTypeComponent } from './request-by-type/request-by-type.component';
import { RequestByLineOfResearchComponent } from './request-by-line-of-research/request-by-line-of-research.component';
import { ResquestByModalityComponent } from './resquest-by-modality/resquest-by-modality.component';
import { RequestByCommitteeComponent } from './request-by-committee/request-by-committee.component';
import { ReportListComponent } from './report-list/report-list.component';


@NgModule({
  declarations: [
    RequestByTypeComponent,
    RequestByLineOfResearchComponent,
    ResquestByModalityComponent,
    RequestByCommitteeComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
