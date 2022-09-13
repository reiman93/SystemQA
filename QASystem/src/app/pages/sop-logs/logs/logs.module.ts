import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { DataGridModule } from '../../../components/data-grid/data-grid.module';

import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    DataGridModule,
    MaterialModule
  ],
  exports: [LogsComponent],
})
export class LogsModule { }
