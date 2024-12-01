import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component:LoginComponent, title:'Login'},
  {path: 'user-list', component:UserListComponent, title:'User-List', canActivate: [AuthGuard]},
];
