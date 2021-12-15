import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { RequestByCommitteeComponent } from './request-by-committee/request-by-committee.component';
import { RequestByLineOfResearchComponent } from './request-by-line-of-research/request-by-line-of-research.component';
import { RequestByTypeComponent } from './request-by-type/request-by-type.component';
import { ResquestByModalityComponent } from './resquest-by-modality/resquest-by-modality.component';

const routes: Routes = [{
  path: "request-by-type",
  component: RequestByTypeComponent
},
{
  path:"request-by-line-of-research",
  component: RequestByLineOfResearchComponent
},
{
  path:"resquest-by-modality",
  component: ResquestByModalityComponent
},
{
  path:"request-by-committee",
  component: RequestByCommitteeComponent
},
{
  path: "report-list",
  component: ReportListComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
