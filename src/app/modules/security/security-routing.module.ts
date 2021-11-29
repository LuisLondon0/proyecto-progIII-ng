import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RemoveUserComponent } from './user/remove-user/remove-user.component';
import { UserCreationComponent } from './user/user-creation/user-creation.component';
import { UserEditionComponent } from './user/user-edition/user-edition.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"logout",
    component: LogoutComponent
  },
  {
    path:"change-password",
    component: ChangePasswordComponent
  },
  {
    path:"reset-password",
    component: ResetPasswordComponent
  },
  {
    path:"user-creation",
    component: UserCreationComponent
  },
  {
    path:"user-edition/:id",
    component: UserEditionComponent
  },
  {
    path:"user-list",
    component: UserListComponent
  },
  {
    path:"remove-user/:id",
    component: RemoveUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
