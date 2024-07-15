import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SchoolService } from "../school.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit, AfterViewInit {

  // Loading state
  loading: boolean = false;
  // Table columns
  displayedColumns: string[] = ['short_name', 'long_name', 'status'];
  // Total schools
  totalSchools = 0;
  // Pagination variables
  currentPageSize = 20; // Default page size
  // Table data source
  dataSource = new MatTableDataSource<any>([]);

  // Paginator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  // Inject SchoolService
  constructor(private schoolService: SchoolService) { }

  // Fetch all schools on init
  ngOnInit(): void {
    this.getAllSchools(0, this.currentPageSize); // Initial fetch with default page and pageSize
  }

  // After view init, set paginator
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  // Fetch all schools
  getAllSchools(page: number, limit: number, filter?: string) {
    this.loading = true; // Set loading state to true
    this.schoolService.getAllSchools({page, limit }, filter).subscribe((data) => {
      this.dataSource.data = data;
      this.totalSchools = data[0].count_document;
      this.loading = false; // Set loading state to false
    });
  }

  // Pagination change event
  onPageChange(event: PageEvent) {
    this.currentPageSize = event.pageSize; // Update currentPageSize based on the event
    this.getAllSchools(event.pageIndex, this.currentPageSize)
  }

}
