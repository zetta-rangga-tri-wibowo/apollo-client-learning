import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input() title: string = 'Card title';
  @Input() content: string | number = 'Card content';

  constructor() { }

  ngOnInit() {
    this.checkInputContent();
  }

  checkInputContent() {
    if (typeof this.content === 'number') {
      return this.content.toLocaleString();
    }
    return this.content;
  }
}
