import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyCHecksRoutingModule } from './daily-checks-routing.module';
import { RestRoomsComponent } from './rest-rooms/rest-rooms.component';
import { KosherCheckListComponent } from './kosher-check-list/kosher-check-list.component';



@NgModule({
  declarations: [],
  imports: [CommonModule, DailyCHecksRoutingModule],
})
export class DailyCHecksModule { }
