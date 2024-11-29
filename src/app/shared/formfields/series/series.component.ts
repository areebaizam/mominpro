import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
//Material
import { MatSelectModule } from '@angular/material/select';
//Models
import { ControlValue, FormControlModel, SelectOptionModel, SeriesModel, ValidatorModel, InputType, ControlType, alphanumericbool } from '@shared/models';

@Component({
    selector: 'tap-series',
    imports: [MatSelectModule],
    templateUrl: './series.component.html',
    styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit {
  @Input({ required: true }) formControl!: FormControl;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) series!: SeriesModel;
  
  ngOnInit(): void {
    this.getSeriesOptions();
  }
  options: SelectOptionModel[]=[];

  private getSeriesOptions() {
    this.generateSeriesOptions(this.series);
  }

  //TODO Move it to service
  private generateSeriesOptions(series: SeriesModel) {
    this.options = [];
    let min = series.validators?.min;
    let max = series.validators?.max;

    if ((min || min == 0) && (max || max == 0)) {
      for (let i = min; i <= max; i++) {
        let label = `${i} ${series.suffix}`;
        let recommended: boolean = false;
        if (!i)
          label = series.baseLabel;

        else if (i * i == 1)
          label = `${i} ${series.suffixUnit}`;

        if ((series.recommendedValue || series.recommendedValue == 0) && i == series.recommendedValue) {
          recommended = true;
          label = `${label} (Recommended)`;
        }

        this.options.push({
          value: i,
          name: label,
          recommended: recommended,
        })
      }
      // this.selected = this.value;
    }
  }

}
