import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/general/home/home.component';
import { NotFoundComponent } from './public/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  /*{
    path: "security",
    loadChildren: () => import("./modules/security/security.module").then(x => x.SecurityModule)
  },*/
  {
    path: "evaluation",
    loadChildren: () => import("./modules/evaluation/evaluation.module").then(x => x.EvaluationModule)
  },
  {
    path: "parameters",
    loadChildren: () => import("./modules/parameters/parameters.module").then(x => x.ParametersModule)
  },
  {
    path: "proponent",
    loadChildren: () => import("./modules/proponent/proponent.module").then(x => x.ProponentModule)
  },
  {
    path: "reports",
    loadChildren: () => import("./modules/reports/reports.module").then(x => x.ReportsModule)
  },
  {
    path: "request",
    loadChildren: () => import("./modules/request/request.module").then(x => x.RequestModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
