import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';

import { MaterialModule } from '../../../material.module';

import { ListComponent } from './list.component';
import { NozleGenericLogsComponent } from '../nozle-generic-logs/nozle-generic-logs.component';
import { RandomAuditComponent } from '../random-audit/random-audit.component';
import { ReserveOutComponent } from '../reserve-out/reserve-out.component';
import { NozzleInspectionComponent } from '../nozzle-inspection/nozzle-inspection.component';
import { ChlorineNozzleComponent } from '../chlorine-nozzle/chlorine-nozzle.component';
import { AnimalHandingComponent } from '../animal-handing/animal-handing.component';
import { HoldTagComponent } from '../hold-tag/hold-tag.component';

@NgModule({
  declarations: [
    ListComponent,
    NozleGenericLogsComponent,
    RandomAuditComponent,
    ReserveOutComponent,
    NozzleInspectionComponent,
    ChlorineNozzleComponent,
    AnimalHandingComponent,
    HoldTagComponent
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
