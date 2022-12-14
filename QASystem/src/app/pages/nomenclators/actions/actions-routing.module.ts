import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =
    [{
        path: "create",
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
    }, {
        path: "edit/:id",
        loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)
    }, {
        path: "list",
        loadChildren: () => import('./list/list.module').then(m => m.ListModule)
    }, {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActionsRoutingModule { }
