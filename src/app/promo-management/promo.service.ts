import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import SweetAlert from 'sweetalert2';



const DELETE_PROMO = gql`
   mutation deletePromo($promoId: ID!) {
    DeletePromo(_id: $promoId) {
     _id
    }
  }
`;

const GET_ALL_PROMOS = gql`
  query getAllPromos($pagination: PaginationInput) {
    GetAllPromos(pagination: $pagination) {
      _id
      title
      sub_title
      ref
      description
      image_url
    }
  }
`;

const CREATE_PROMO = gql`
  mutation createPromo($promo: PromoInput!) {
    CreatePromo(promo_input: $promo) {
      title
      sub_title
      ref
      description
      image_url
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  constructor(private apollo: Apollo) {}

  getPromoList(pagination: { limit: number; page: number }): Observable<any> {
    return this.apollo.query<any>({
      query: GET_ALL_PROMOS,
      variables: {
        pagination
      },
      fetchPolicy: 'network-only' // Ensures the query always goes to the network
    })
    .pipe(
      map(result => {
        return result.data['GetAllPromos']
      })
    );
  }

  deletePromo(promoId: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: DELETE_PROMO,
      variables: {
        promoId: promoId
      },
    }).pipe(
      map(result => {
        console.log(result.data['DeletePromo'])
        return result.data['DeletePromo']
      })
    );
  }

  createPromo(promo: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: CREATE_PROMO,
      variables: {
        promo
      },
      refetchQueries: ['getAllPromos']
    }).pipe(
      map(result => {
        return result.data['CreatePromo']
      }),
    );
  }

  getDetails(id: string): Observable<any> {
    return this.apollo.query<any>({
      query: gql`
        query getOnePromo($id: ID!) {
          GetOnePromo(_id: $id) {
            _id
            title
            sub_title
            ref
            description
            image_url
          }
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map(result => {
        return result.data['GetOnePromo']
      })
    );
  }

  updatePromo(id: string, promo: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation updatePromo($id: ID!, $promo: PromoInput!) {
          UpdatePromo(_id: $id, promo_input: $promo) {
            title
            sub_title
            ref
            description
          }
        }
      `,
      variables: {
        id,
        promo
      }
    }).pipe(
      map(result => {
        return result.data['UpdatePromo']
      })
    );
  }
}
