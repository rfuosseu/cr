import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunburstComponent } from './charts/sunburst/sunburst.component';



@NgModule({
  declarations: [
    SunburstComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SunburstComponent
  ]
})
export class ComponentsModule { }
