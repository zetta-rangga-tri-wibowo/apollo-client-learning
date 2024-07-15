import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Title {
  _id: string
  short_name: string
}
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private apollo: Apollo) { }

  getTitles(status: boolean): Observable<any> {
    return this.apollo.query({
      query: gql`
      query ($status: Boolean){
        GetAllTitles (
          is_published: $status
        ) {
          _id
          short_name
        }
      }
      `,
      variables: {
        status
      }
    })
  }




}
