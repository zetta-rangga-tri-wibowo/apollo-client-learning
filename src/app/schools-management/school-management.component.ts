import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../users-management/user.service";
import { SchoolService } from "./school.service";

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent implements OnInit {

  totalUsers : number | string = 0;
  totalSchools: number = 0; // Variable to hold total schools


  constructor(private userService: UserService, private schoolService: SchoolService) { }


  ngOnInit(): void {
    this.getTotalUsers();
  }

  // Get Total Users
  getTotalUsers() {
    this.userService.getAllUsers({ page: 0, limit: 10 }).subscribe((data) => {
      this.totalUsers = data[0].count_document;
      console.log(this.totalUsers);
    });
  }

  // Handle total of schools
  handleTotalOfSchools(total: number) {
    this.totalSchools = total; // Update total schools when the event is emitted
  }

  // Getter for school statistics
  get schoolStatistic() {
    return [
      { title: 'Faculty', value: 10 },
      { title: 'Schools', value: this.totalSchools },
      { title: 'Locations', value: 190 },
      { title: 'Students', value: this.totalUsers },
    ];
  }

}
