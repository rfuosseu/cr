import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
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

  data = [
    {id: 1, parent: null, value: 500, label: 'Asie'},
    {id: 2, parent: null, value: 100, label: 'Afrique'},
    {id: 3, parent: null, value: 200, label: 'Europe'},
    {id: 4, parent: 1, value: 200, label: 'Enfants'},
    {id: 5, parent: 1, value: 100, label: 'Jeunes'},
    {id: 6, parent: 1, value: 60, label: 'Adultes'},
    {id: 7, parent: 2, value: 20, label: 'Enfants'},
    {id: 8, parent: 2, value: 10, label: 'Jeunes'},
    {id: 9, parent: 3, value: 60, label: 'Adultes'}
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
