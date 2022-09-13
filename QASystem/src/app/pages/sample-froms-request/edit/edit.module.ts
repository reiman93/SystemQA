import {NgModule }from '@angular/core'; 
import {CommonModule }from '@angular/common'; 

import {EditRoutingModule }from './edit-routing.module'; 
import {EditComponent }from './edit/edit.component'; 
import {MaterialModule}from '../../../material.module'; 


@NgModule( {
declarations:[
    EditComponent
  ], 
imports:[
    CommonModule, 
EditRoutingModule, 
MaterialModule
  ]
})
export class EditModule {}
