import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  private rating: number = 0;
  private stars: boolean[];

  @Input()
  private readonly: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
    // this.stars = [];
    // const full: number = Math.floor(this.rating);
    // const half: number = Math.ceil(this.rating - full);
    // const empty: number = 5 - full - half;
    // for (let i = 0; i < 5; i++) {
    //   if (i < full) {
    //     this.stars.push('full');
    //   } else if (i === full && half !== 0) {
    //     this.stars.push('half')
    //   } else {
    //     this.stars.push('empty')
    //   }
    // }
  }

  clickStar(index: number) {
    if (!this.readonly){
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
      //this.ngOnInit()
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating ? true : false);
    }
  }


}

