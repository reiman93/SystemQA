import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { DataGridModule } from '../../../components/data-grid/data-grid.module';

import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    DataGridModule,
    MaterialModule
  ],
  exports: [ListComponent],
})
export class ListModule { }
