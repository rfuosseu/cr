import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import Sunburst from 'sunburst-chart';

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.less']
})
export class SunburstComponent implements AfterViewInit {
  @Input() data: INode = {};
  @Input() colorLabel: string = 'color';
  @Input() size: number = 500;
  @ViewChild('sunburst') elRef: ElementRef | undefined;

  currentNode: INode | undefined;
  private _totalSize: number = 0;


  constructor() {
  }

  ngAfterViewInit(): void {
    this._totalSize = this._calculateValue(this.data);


    Sunburst()
      .data(this.data)
      .width(this.size)
      .height(this.size)
      .color(this.colorLabel)
      .onHover((data) => this._displayLabel(data))
      .radiusScaleExponent(1)
      (this.elRef!.nativeElement);
  }

  getPercentage(data: any) {
    return (data.__dataNode.value * 100 / this._totalSize).toPrecision(3);
  }

  private _displayLabel(data: any){
    if(data) {
      console.log(data)
      this.currentNode = data;
    }
  }


  private _calculateValue(data: INode) {
    if(data.children) {
      let value: number = 0;
      data.children.forEach(ch => {
        value += this._calculateValue(ch);
      });
      return value;
    } else {
      return data.value!;
    }
  }

}

export interface INode {
  name?: string;
  color?: string;
  value?: number;
  children?: INode[];
}
