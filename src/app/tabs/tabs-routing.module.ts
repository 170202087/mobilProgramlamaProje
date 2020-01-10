import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        canActivateChild: [AuthGuard],
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'aracyonetim',
        loadChildren: () => import('../aracyonetim/aracyonetim.module').then(m => m.AracyonetimPageModule)
      },
      {
        canActivateChild: [AuthGuard],
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat/chat.module').then(m => m.ChatPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
      }
    ]
    
  },
  {
    canActivate: [AuthGuard],
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
