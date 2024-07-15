import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  // loading init
  loading: boolean = false;
  // datasource table
  dataSource: any
// displayed columns
  displayedColumns = ['civility', 'last_name', 'first_name'];
  // pagination
  pagination = {
    limit: 10,
    page: 0
  }
  // filter last search name
  lastName: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers(this.pagination, this.lastName);
  }


  // Get All Users
  getAllUsers(pagination: any, search?: string) {
    if (search && search.length < 4) {
      alert("Please enter at least 4 characters to search.");
      return;
    }
    this.loading = true;
    this.userService.getAllUsers(pagination, search).subscribe(result => {
      this.dataSource = result.data['GetAllUsers'];
      this.loading = false;
    });
  }


  // Filter
  onChangesFilter(event: Event) {
    this.lastName = (event.target as HTMLInputElement).value.toUpperCase();
    if (this.lastName === '') {
      this.getAllUsers(this.pagination);
    }
  }


  // Apply Filter
  applyFilter() {
    if (this.lastName.length < 4) {
      alert("Please enter at least 4 characters to search.");
      return;
    }
    if (!this.loading) {
      this.getAllUsers(this.pagination, this.lastName);
    }
  }

}
