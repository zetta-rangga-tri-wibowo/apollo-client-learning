import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromoService } from "../promo.service";
import { SubSink } from "subsink";
import { Router } from "@angular/router";


@Component( {
  selector: 'app-promo-card-list',
  templateUrl: './promo-card-list.component.html',
  styleUrls: [ './promo-card-list.component.scss' ]
} )
export class PromoCardListComponent implements OnInit, OnDestroy {
  // SubSink instance
  private subs = new SubSink();
  // loading state
  loading: boolean = false;
  // promo list
  promoList: any;
  // pagination
  pagination = { limit: 10, page: 0};
  // page number
  pageNumber = 1;

  // constructor service injection
  constructor( private promoService: PromoService, private route:Router) {}

  ngOnInit() {
    // get promo list
    this.getPromoList( this.pagination )
  }

  // get promo list
  getPromoList( pagination: { limit: number; page: number } ) {
    this.loading = true
    this.subs.sink = this.promoService.getPromoList( pagination ).subscribe( ( data ) => {
      this.promoList = data;
      if ( this.promoList ) {
        this.loading = false
      }
    } );
  }

  // Pagination Previous Page
  onPreviousPage() {
    if (this.pageNumber === 1) return
    this.pagination.page = this.pagination.page - 1
    this.pageNumber = this.pageNumber - 1
    this.getPromoList( this.pagination )
  }


  // Pagination Next Page
  onBackPage() {
    this.pagination.page = this.pagination.page + 1
    this.pageNumber = this.pageNumber + 1
    this.getPromoList( this.pagination )
  }

  // delete promo
  deletePromo( id: string ) {
    this.loading = true
    if ( id ) {
      this.promoService.deletePromo( id ).subscribe( ( data ) => {
        if ( data ) {
          this.getPromoList( { limit: 10, page: 0 } )
        }
      } );
    }
    this.loading = false
  }

  // view promo
  viewPromo( id: string ) {
    if ( id ) {
      this.route.navigate(['promo/', id])
    }
  }

  // unsubscribe from subscriptions
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
