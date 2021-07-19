import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.less']
})
export class SunburstComponent implements OnInit {
  @Input() data: IData[] = [];
  datas: INode  = {
    name: 'TOPICS', children: [{
        name: 'Topic A',
        children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
    }, {
        name: 'Topic B',
        children: [{name: 'Sub B1', size: 1}, {name: 'Sub B2', size: 1}, {
            name: 'Sub B3', size: 3}]
    }, {
        name: 'Topic D',
        children: [{name: 'Sub B1', size: 1}, {name: 'Sub B2', size: 1}, {
            name: 'Sub B3', size: 3}]
    }, {
        name: 'Topic C',
        children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
    }]
  };

  hostElement: HTMLElement;
  width: number = 200;
  height: number = 200;
  radius: number = 0;
  color = d3.scaleOrdinal(d3.schemeCategory10);


  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    this.radius = Math.min(this.width, this.height) / 2;

    const g = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width/2}, ${this.height/2})`);

    const partition = d3.partition().size([2*Math.PI, this.radius]);

    const root = d3.hierarchy(this.datas).sum((d: any) => d.size)

    partition(root);

    const arc = d3.arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.y0)
      .outerRadius((d: any) => d.y1);

    console.log(root.descendants())

    g.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .append('path')
      .attr('display', (d: any) => d.depth ? null : 'none')
      .attr('d', arc as any)
      .style('stroke', '#fff')
      .style('fill', (d: any) => this.color((d.children ? d : d.parent).data.name));

    g.selectAll('.node')
      .append('text')
      .attr('transform', (d: any) => {
          let angle = (d.x0 + d.x1) / Math.PI * 90;
          angle = (angle < 90 || angle > 270) ? angle : angle + 180;

          return 'translate(' + arc.centroid(d) + ')rotate(' + angle + ')';
        })
      .attr('dx', '-20') // radius margin
      .attr('dy', '.5em') // rotation align
      .text((d: any) => d.parent ? d.data.name : '' );
  }

}

export interface IData {
  id: number;
  value: number;
  parent: number | null;
  label: string;
}

export interface INode {
  name: string;
  size?: number;
  children?: INode[];
}
