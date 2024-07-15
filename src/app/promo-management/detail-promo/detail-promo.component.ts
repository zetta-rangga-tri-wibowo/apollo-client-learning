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
  id : string  = '' ;

  constructor( private route: ActivatedRoute, private promoService: PromoService ) {
  }


  ngOnInit(): void {
    this.getIdParam();
  }

  getIdParam() {
    let id = this.route.snapshot.paramMap.get( 'id' );
    if (id) {
      this.id = id;
      this.getDetails( id );
    }
  }

  getDetails( id: string ) {
    this.loading = true;
    this.promoService.getDetails( id ).subscribe( ( data ) => {
      console.log( data );
      this.promo = data;
      this.loading = false;
    } );
  }


  refreshPromoList() {
    console.log('refreshing promo list')
    this.getDetails(this.id)
  }

}

