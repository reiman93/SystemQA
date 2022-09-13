import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';

import { MaterialModule } from '../../../material.module';

import { ListComponent } from './list.component';
import { CcpGenericLogsComponent } from '../ccp-generic-logs/ccp-generic-logs.component';



@NgModule({
  declarations: [
    ListComponent,
    CcpGenericLogsComponent
  ],

  imports: [
    CommonModule,
    ListRoutingModule,
    MaterialModule,
  ],
  exports: [
    ListComponent
  ],
})
export class ListModule { }
