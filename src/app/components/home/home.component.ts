import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SunburstFomaterService } from '../../shared/services/sunburst-fomater.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  data: any = [
  'other-account-account-account-search-product,30',
  'other-account-account-account-search-search,17',
  'other-account-account-end,1128',
  'other-account-account-home-account-account,27',
  'other-account-account-home-account-end,5',
  'other-account-account-home-account-home,6',
  'other-account-account-home-account-other,3',
  'other-account-account-home-account-product,14',
  'other-account-account-home-account-search,1',
  'other-account-account-home-end,74',
  'other-account-account-home-home-account,5',
  'other-account-account-home-home-end,7',
  'other-account-account-home-home-home,5',
  'other-account-account-home-home-other,6',
  'other-account-account-home-home-product,10',
  'other-account-account-home-home-search,3',
  'other-account-account-home-other-account,3',
  'other-account-account-home-other-end,4',
  'other-account-account-home-other-home,4',
  'other-account-account-home-other-other,9',
  'other-account-account-home-other-product,9',
  'other-account-account-home-product-account,19',
  'other-account-account-home-product-end,22',
  'other-account-account-home-product-home,19',
  'other-account-account-home-product-other,6',
  'other-account-account-home-product-product,41',
  'other-account-account-home-product-search,5',
  'other-account-account-home-search-account,6',
  'other-account-account-home-search-end,1'
];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sunburstService: SunburstFomaterService) {}

  ngOnInit() {
    this.data = this.sunburstService.formatBigQuery(this.data)[0];
    console.log(this.data)
  }
}
