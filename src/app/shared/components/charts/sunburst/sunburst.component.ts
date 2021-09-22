import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import Sunburst from 'sunburst-chart';

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.less']
})
export class SunburstComponent implements OnInit {
  @Input() data: INode = {};
  @Input() colorLabel: string = 'color';

  hostElement: HTMLElement;
  size: number = 300;


  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    Sunburst()
      .data(this.data)
      .width(this.size)
      .height(this.size)
      .color(this.colorLabel)
      .radiusScaleExponent(1)
      (this.hostElement);
  }

}

export interface INode {
  name?: string;
  color?: string;
  value?: number;
  children?: INode[];
}
