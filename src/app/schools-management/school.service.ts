import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_ALL_SCHOOLS = gql`
  query GetAllSchools($pagination: PaginationInput, $filter: SchoolFilterInput) {
    GetAllSchools(pagination: $pagination, filter: $filter) {
      _id
      short_name
      long_name
      status
      count_document
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private apollo: Apollo) { }

  // Get All Schools
  getAllSchools(pagination: { limit: number; page: number }, filter?: string): Observable<any> {
    return this.apollo.query<any>({
      query: GET_ALL_SCHOOLS,
      variables: {
        pagination,
        filter: { short_name: filter }
      },
      fetchPolicy: 'network-only' // Fetch data from the server
    })
      .pipe(
        map(result => {
          // Return the data from the server
          return result.data['GetAllSchools']
        })
      );
  }
}
