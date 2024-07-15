import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Promo } from "../promo.type";
import { PromoService } from "../promo.service";

@Component( {
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.component.html',
  styleUrls: [ './detail-promo.component.css' ]
} )
export class DetailPromoComponent implements OnInit {
  promo = {} as Promo;
  loading: boolean = false;


  constructor( private route: ActivatedRoute, private promoService: PromoService ) {
  }


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get( 'id' );
    if ( id ) {
      this.getDetails( id );
    }
  }

  getDetails( id: string ) {
    this.loading = true;
    this.promoService.getDetails( id ).subscribe( ( data ) => {
      this.promo = data;
      this.loading = false;
    } );
  }


}

