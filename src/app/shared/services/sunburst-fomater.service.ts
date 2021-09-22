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

    return this._formatJsonBQ(res, Object.keys(colorName));
  }

  /**
   * Formats json bq
   * @param data
   * @param colors
   * @returns
   */
  private _formatJsonBQ(data: any, colors: string[]) {
    let res: any[] = [];
    colors = _.shuffle(colors);

    _.forIn(data, (value: any, name: string) => {
      if (typeof value === 'number') {
        res.push({ name, value, color: colors.shift() });
      } else {
        res.push({
          name,
          color: colors.shift(),
          children: this._formatJsonBQ(value, colors)
        });
      }
    })

    return res;
  }

}
