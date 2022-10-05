import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserPageModule), canActivate: [AuthGuard] },
  { path: 'person', loadChildren: () => import('./persons/person.module').then(m => m.PersonPageModule), canActivate: [AuthGuard] },
  { path: 'companies', loadChildren: () => import('./companies/company.module').then(m => m.CompanyPageModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
