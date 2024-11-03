import { Component, computed, input, output } from '@angular/core';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
//Models
import { BtnToggleModel } from '@shared/models';

const materialModules = [MatButtonModule, MatIconModule, MatTooltipModule]
@Component({
  selector: 'tap-btn-toggle',
  standalone: true,
  imports: [...materialModules],
  templateUrl: './btn-toggle.component.html',
  styleUrl: './btn-toggle.component.scss'
})
export class BtnToggleComponent {
  data = input<BtnToggleModel>(new BtnToggleModel());
  toggle = output<void>()
  icon = computed<string>(() => this.data().isActive ? this.data().icon : this.data().iconAlt);
  tooltip = computed<string>(() => this.data().isActive ? this.data().tooltip : this.data().tooltipAlt);


  onBtnClicked($event: Event): void {
    $event.stopPropagation();
    this.toggle.emit();
  }
}
