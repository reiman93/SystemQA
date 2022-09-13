import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { MaterialModule } from './../material.module';

import { AppSidebarComponent } from './../components/sidebar/sidebar.component';
import { MenuListItemComponent } from './../components/sidebar/menu-list-item/menu-list-item.component';
import { NomenclatorsComponent } from './nomenclators/nomenclators/nomenclators.component';

@NgModule({
  declarations: [
    PagesComponent,
    MenuListItemComponent,
    AppSidebarComponent,
    NomenclatorsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
  ],
})
export class PagesModule { }
