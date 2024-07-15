import { Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";

const GET_ALL_USERS = gql`
  query GetAllUsers($pagination: PaginationInput, $last_name: String) {
    GetAllUsers(pagination: $pagination, last_name: $last_name) {
      first_name
      last_name
      civility
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  // Get all users
  getAllUsers(pagination: any, last_name?: string) :  Observable<any> {
    return this.apollo.query({
      query: GET_ALL_USERS,
      variables: {
        pagination,
        last_name
      },
    });
  }

}
