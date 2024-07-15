import { Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const GET_ALL_USERS = gql`
  query GetAllUsers($pagination: PaginationInput, $last_name: String) {
    GetAllUsers(pagination: $pagination, last_name: $last_name) {
      first_name
      last_name
      civility
      count_document
    }
  }
`;

@Injectable( {
  providedIn: 'root'
} )
export class UserService {
  constructor( private apollo: Apollo ) {
  }

  // Get all users
  // getAllUsers(pagination: any, last_name?: string) :  Observable<any> {
  //   return this.apollo.query({
  //     query: GET_ALL_USERS,
  //     variables: {
  //       pagination,
  //       last_name
  //     },
  //   });
  // }
  getAllUsers( pagination: any, last_name?: string ): Observable<any> {
    return this.apollo.query<any>( {
      query: GET_ALL_USERS,
      variables: {
        pagination,
        last_name
      }
    } ).pipe(
      map( result => {
        return result.data['GetAllUsers'];
      } )
    );
  }
}
