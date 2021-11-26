import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { BondingCreationComponent } from './bonding/bonding-creation/bonding-creation.component';
import { BondingEditionComponent } from './bonding/bonding-edition/bonding-edition.component';
import { BondingListComponent } from './bonding/bonding-list/bonding-list.component';
import { RemoveBondingComponent } from './bonding/remove-bonding/remove-bonding.component';
import { FacultyCreationComponent } from './faculty/faculty-creation/faculty-creation.component';
import { FacultyEditionComponent } from './faculty/faculty-edition/faculty-edition.component';
import { FacultyListComponent } from './faculty/faculty-list/faculty-list.component';
import { RemoveFacultyComponent } from './faculty/remove-faculty/remove-faculty.component';
import { DepartmentCreationComponent } from './department/department-creation/department-creation.component';
import { DepartmentEditionComponent } from './department/department-edition/department-edition.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { RemoveDepartmentComponent } from './department/remove-department/remove-department.component';
import { TypeOfRequestCreationComponent } from './type-of-request/type-of-request-creation/type-of-request-creation.component';
import { TypeOfRequestEditionComponent } from './type-of-request/type-of-request-edition/type-of-request-edition.component';
import { TypeOfRequestListComponent } from './type-of-request/type-of-request-list/type-of-request-list.component';
import { RemoveTypeOfRequestComponent } from './type-of-request/remove-type-of-request/remove-type-of-request.component';
import { ModalityCreationComponent } from './modality/modality-creation/modality-creation.component';
import { ModalityEditionComponent } from './modality/modality-edition/modality-edition.component';
import { ModalityListComponent } from './modality/modality-list/modality-list.component';
import { RemoveModalityComponent } from './modality/remove-modality/remove-modality.component';
import { CommitteeCreationComponent } from './committee/committee-creation/committee-creation.component';
import { CommitteeEditionComponent } from './committee/committee-edition/committee-edition.component';
import { CommitteeListComponent } from './committee/committee-list/committee-list.component';
import { RemoveCommitteeComponent } from './committee/remove-committee/remove-committee.component';
import { LineOfResearchCreationComponent } from './line-of-research/line-of-research-creation/line-of-research-creation.component';
import { LineOfResearchEditionComponent } from './line-of-research/line-of-research-edition/line-of-research-edition.component';
import { LineOfResearchListComponent } from './line-of-research/line-of-research-list/line-of-research-list.component';
import { RemoveLineOfResearchComponent } from './line-of-research/remove-line-of-research/remove-line-of-research.component';
import { JuryCreationComponent } from './jury/jury-creation/jury-creation.component';
import { JuryEditionComponent } from './jury/jury-edition/jury-edition.component';
import { JuryListComponent } from './jury/jury-list/jury-list.component';
import { RemoveJuryComponent } from './jury/remove-jury/remove-jury.component';


@NgModule({
  declarations: [
    BondingCreationComponent,
    BondingEditionComponent,
    BondingListComponent,
    RemoveBondingComponent,
    FacultyCreationComponent,
    FacultyEditionComponent,
    FacultyListComponent,
    RemoveFacultyComponent,
    DepartmentCreationComponent,
    DepartmentEditionComponent,
    DepartmentListComponent,
    RemoveDepartmentComponent,
    TypeOfRequestCreationComponent,
    TypeOfRequestEditionComponent,
    TypeOfRequestListComponent,
    RemoveTypeOfRequestComponent,
    ModalityCreationComponent,
    ModalityEditionComponent,
    ModalityListComponent,
    RemoveModalityComponent,
    CommitteeCreationComponent,
    CommitteeEditionComponent,
    CommitteeListComponent,
    RemoveCommitteeComponent,
    LineOfResearchCreationComponent,
    LineOfResearchEditionComponent,
    LineOfResearchListComponent,
    RemoveLineOfResearchComponent,
    JuryCreationComponent,
    JuryEditionComponent,
    JuryListComponent,
    RemoveJuryComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
