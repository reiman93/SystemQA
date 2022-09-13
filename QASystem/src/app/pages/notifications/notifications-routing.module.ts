import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    // canActivate: [NgxPermissionsGuard],
    /*  data: {
        permissions: {
          only: 'person_list',
          redirectTo: environment.UNAUTHORIZED_PATH
        }
      },*/
    loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
  },
  { path: '', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule { }
