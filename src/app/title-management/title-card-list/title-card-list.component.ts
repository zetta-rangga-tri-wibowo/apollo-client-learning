import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-title-card-list',
  templateUrl: './title-card-list.component.html',
  styleUrls: ['./title-card-list.component.scss']
})
export class TitleCardListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  titles: any;

  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    // this.getUnpublishedTitles();
    this.getPublishedTitles();
  }

  getPublishedTitles() {
    const status = true;
    this.subs.sink = this.titleService.getTitles(status).subscribe(resp => {
      console.log(resp);
      // this.formatTitlesData(resp);
    })
  }

  // getUnpublishedTitles() {
  //   const status = false;
  //   this.subs.sink = this.titleService.getTitles(status).subscribe(resp => {
  //     console.log(resp);
  //     this.formatTitlesData(resp);
  //   })
  // }

  // formatTitlesData(data: any) {
  //   this.titles = data.data.GetAllTitles;
  //   console.log(this.titles);
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
