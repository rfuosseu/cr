import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    CDKLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class LayoutModule { }
