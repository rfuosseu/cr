import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as colorName from 'color-name';
import * as colors from 'color-name';

@Injectable({
  providedIn: 'root'
})
export class SunburstFomaterService {

  constructor() { }

  /**
   * Formats big query
   * @param data
   * @returns
   */
  formatBigQuery(data: string[]) {
    const res = data.reduce((acc, line) => {
      const entries: string[] = line.split(',');
      _.set(acc, entries[0].replace(/-/g, '.'), parseFloat(entries[1]));
      return acc;
    }, {});
    const selectedColors: any = {};

    return this._formatJsonBQ(res, Object.keys(colorName), selectedColors);
  }

  /**
   * Formats json bq
   * @param data
   * @param colors
   * @returns
   */
  private _formatJsonBQ(data: any, colors: string[], selectedColors: any) {
    let res: any[] = [];
    colors = _.shuffle(colors);

    _.forIn(data, (value: any, name: string) => {
      if (!selectedColors[name]) {
        selectedColors[name] = colors.shift();
      }

      if (typeof value === 'number') {
        res.push({ name, value, color: selectedColors[name] });
      } else {
        res.push({
          name,
          color: selectedColors[name],
          children: this._formatJsonBQ(value, colors, selectedColors)
        });
      }
    });

    return res;
  }

}
