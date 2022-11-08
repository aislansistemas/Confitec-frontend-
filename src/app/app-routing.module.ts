import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './Users/list-users/list-users.component';
import { RegisterUserComponent } from './Users/register-users/register-users.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent
  },
  {
    path: 'users/new',
    component: RegisterUserComponent
  },
  {
    path: 'users/:id/edit',
    component: RegisterUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
