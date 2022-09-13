import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';

import { MaterialModule } from '../../../material.module';

import { ListComponent } from './list.component';
import { SopGenircLogComponent } from '../sop-genirc-log/sop-genirc-log.component';
import { SopSuplementComponent } from '../sop-suplement/sop-suplement.component';



@NgModule({
  declarations: [
    ListComponent,
    SopGenircLogComponent,
    SopSuplementComponent
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
