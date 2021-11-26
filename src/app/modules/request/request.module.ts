import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestCreationComponent } from './request-creation/request-creation.component';
import { RequestEditionComponent } from './request-edition/request-edition.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RemoveRequestComponent } from './remove-request/remove-request.component';


@NgModule({
  declarations: [
    RequestCreationComponent,
    RequestEditionComponent,
    RequestListComponent,
    RemoveRequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
