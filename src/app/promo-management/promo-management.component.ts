import { Component, OnInit, ViewChild } from '@angular/core';
import { PromoCardListComponent } from "./promo-card-list/promo-card-list.component";

@Component({
  selector: 'app-promo-management',
  templateUrl: './promo-management.component.html',
  styleUrls: ['./promo-management.component.scss']
})
export class PromoManagementComponent implements OnInit {

  @ViewChild(PromoCardListComponent) promoListComp!: PromoCardListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  refreshPromoList() {
    this.promoListComp.getPromoList({ limit: 10, page: 0 });
  }

}
