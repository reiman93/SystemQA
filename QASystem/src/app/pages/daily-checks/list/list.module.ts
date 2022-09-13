import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';

import { MaterialModule } from '../../../material.module';

import { ListComponent } from './list.component';

import { WrKillFloorComponent } from '../wr-kill-floor/wr-kill-floor.component';
import { WrSpinalCordComponent } from '../wr-spinal-cord/wr-spinal-cord.component';
import { WrSlaughterFloorComponent } from '../wr-slaughter-floor/wr-slaughter-floor.component';
import { SlaughterFloorVisualComponent } from '../slaughter-floor-visual/slaughter-floor-visual.component';
import { SpinalCordSheathComponent } from '../spinal-cord-sheath/spinal-cord-sheath.component';
import { SlaugtherMovementLogComponent } from '../slaugther-movement-log/slaugther-movement-log.component';
import { ChecksCleanigTowelsComponent } from '../checks-cleanig-towels/checks-cleanig-towels.component';
import { RestRoomsComponent } from '../rest-rooms/rest-rooms.component';
import { KosherCheckListComponent } from '../kosher-check-list/kosher-check-list.component';


@NgModule({
  declarations: [
    ListComponent,
    WrKillFloorComponent,
    SlaughterFloorVisualComponent,
    WrSpinalCordComponent,
    WrSlaughterFloorComponent,
    SpinalCordSheathComponent,
    SlaugtherMovementLogComponent,
    ChecksCleanigTowelsComponent,
    RestRoomsComponent,
    KosherCheckListComponent
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
