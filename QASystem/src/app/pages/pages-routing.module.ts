import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { Role } from './../models/user';

const routes: Routes =
    [{
        path: '', component: PagesComponent,
        children: [
            {
                path: 'register',
                loadChildren: () => import('./register/register.module').then((n) => n.RegisterModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA,
                    ]
                }
            },
            {
                path: "notifications", loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                    ]
                }
            },
            {
                path: "nomenclators", loadChildren: () => import('./nomenclators/nomenclators.module').then(m => m.NomenclatorsModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                    ]
                }
            },
            {
                path: "pre-operational", loadChildren: () => import('./pre-operational/pre-operational.module').then(m => m.PreOperationalModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: "simple-request-form", loadChildren: () => import('./sample-froms-request/sample-froms-request.module').then(m => m.SampleFormsRequestModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: "daily-checks", loadChildren: () => import('./daily-checks/daily-checks.module').then(m => m.DailyCHecksModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: "sop-logs", loadChildren: () => import('./sop-logs/sop-logs.module').then(m => m.SopLogsModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: "ccp", loadChildren: () => import('./ccp/ccp.module').then(m => m.CcpModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: "nozzle", loadChildren: () => import('./nozzle/nozzle.module').then(m => m.NozleModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                data: {
                    roles: [
                        Role.Admin,
                        Role.QA
                    ]
                }
            },
            {
                path: '**',
                redirectTo: 'auth',
              }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
