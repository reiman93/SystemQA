import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../_helpers/auth.guard';
import { Role } from './../../models/user';
import { NomenclatorsComponent } from './nomenclators/nomenclators.component';

const routes: Routes = [
  {
    path: '', component: NomenclatorsComponent,
    children: [
      {
        path: "area", loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "actions", loadChildren: () => import('./actions/actions.module').then(m => m.ActionsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "turn", loadChildren: () => import('./turn/turn.module').then(m => m.TurnModule), canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "department", loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      }, {
        path: "deficiency", loadChildren: () => import('./deficiency/deficiency.module').then(m => m.DeficiencyModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "company", loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "janitor", loadChildren: () => import('./janitor/janitor.module').then(m => m.JanitorModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      }, {
        path: "preventive-actions", loadChildren: () => import('./preventive_actions/preventive_actions.module').then(m => m.PreventiveActionsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },

      {
        path: "laboratory", loadChildren: () => import('./laboratory/laboratory.module').then(m => m.LaboratoryModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "analysis-state", loadChildren: () => import('./analysis_state/analysis-state.module').then(m => m.AnalysisStateModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "analysis-type", loadChildren: () => import('./analysis_type/analysis-type.module').then(m => m.AnalysisTypeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "sample-forms", loadChildren: () => import('./sample-froms/sample-froms.module').then(m => m.SampleFormsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: "sample-request-type", loadChildren: () => import('./sample-request-type/sample-request-type.module').then(m => m.SampleRequestTypeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        data: {
          roles: [
            Role.Admin,
          ]
        }
      },
      {
        path: '**',
        redirectTo: 'auth',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclatorsRoutingModule { }
