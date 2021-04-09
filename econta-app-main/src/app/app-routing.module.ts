import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NotAuthenticationGuard } from './core/guards/not-authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule),
    canActivate: [NotAuthenticationGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/account/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    canActivate: [NotAuthenticationGuard]
  },
  {
    path: 'ticket-create',
    loadChildren: () => import('./pages/ticket-create/ticket-create.module').then( m => m.TicketCreatePageModule)
  },
  {
    path: 'ticket-create/:id',
    loadChildren: () => import('./pages/ticket-create/ticket-create.module').then( m => m.TicketCreatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
