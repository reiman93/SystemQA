import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';

import { DataGridModule } from '../../../../components/data-grid/data-grid.module';
import { MaterialModule } from '../../../../material.module';
import { ListComponent } from './list.component';

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
