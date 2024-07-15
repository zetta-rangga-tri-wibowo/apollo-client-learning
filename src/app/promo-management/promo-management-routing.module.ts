import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoManagementComponent } from './promo-management.component';
import { DetailPromoComponent } from "./detail-promo/detail-promo.component";

const routes: Routes = [
  {
    path: '',
    component: PromoManagementComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id',
    component: DetailPromoComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoManagementRoutingModule { }
