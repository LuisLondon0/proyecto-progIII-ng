import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProponentRoutingModule } from './proponent-routing.module';
import { RemoveProponentComponent } from './remove-proponent/remove-proponent.component';
import { ProponentCreationComponent } from './proponent-creation/proponent-creation.component';
import { ProponentEditionComponent } from './proponent-edition/proponent-edition.component';
import { ProponentListComponent } from './proponent-list/proponent-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RemoveProponentComponent,
    ProponentCreationComponent,
    ProponentEditionComponent,
    ProponentListComponent
  ],
  imports: [
    CommonModule,
    ProponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProponentModule { }
