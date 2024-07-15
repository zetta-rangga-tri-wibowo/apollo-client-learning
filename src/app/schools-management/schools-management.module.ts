import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsManagementRoutingModule } from './schools-management-routing.module';
import { SchoolTableComponent } from './school-table/school-table.component';
import { SharedModule } from '../shared/shared.module';
import { SchoolManagementComponent } from "./school-management.component";
import { CardComponent } from "../components/card/card.component";


@NgModule({
  declarations: [
    SchoolTableComponent,
    SchoolManagementComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SchoolsManagementRoutingModule
  ]
})
export class SchoolsManagementModule { }
