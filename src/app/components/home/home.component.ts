import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SunburstFomaterService } from '../../shared/services/sunburst-fomater.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { thru } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  uploadedFile: File | undefined;
  colorLabel: string = 'color';
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Visualize your data', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Visualize your data', cols: 2, rows: 2 },
      ];
    })
  );

  data: any;

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private sunburstService: SunburstFomaterService) {
    this.form = this.fb.group({
      type: [undefined, Validators.required],
      file: [undefined, Validators.required]
    });
  }

  ngOnInit() {}

  onUpload() {
    const stream = new FileReader();
    if(this.uploadedFile) {
      stream.readAsText(this.uploadedFile, 'UTF8');
      stream.onload = () => {
        if (this.form.value.type === 'json') {
          this.data = JSON.parse(<string>stream.result);
          this.colorLabel = 'hex';
        } else {
          const csv = (<string>stream.result).split('\n')
          this.data = this.sunburstService.formatBigQuery(csv)[0];
          this.colorLabel = 'color';
        }
      };
    }
  }

  upload(event: any) {
    this.uploadedFile = event.target.files[0];
  }
}
