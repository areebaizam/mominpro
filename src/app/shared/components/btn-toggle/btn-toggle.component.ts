import { Component, computed, inject, Input } from '@angular/core';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
//Services
import { ToggleService } from '@shared/services';
//Models
import { BtnToggleModel, eBtnToggleType } from '@shared/models';


const materialModules = [MatButtonModule, MatIconModule, MatTooltipModule]
@Component({
  selector: 'tap-btn-toggle',
  standalone: true,
  imports: [...materialModules],
  templateUrl: './btn-toggle.component.html',
  styleUrl: './btn-toggle.component.scss'
})
export class BtnToggleComponent {
  @Input({ required: true }) type!: eBtnToggleType;
  @Input() showLabel:boolean = false;

  toggleService = inject(ToggleService);
  icon = computed<string>(() => this.getIcon());
  tooltip = computed<string>(() => this.getTooltip());

  onBtnClicked($event: Event): void {
    $event.stopPropagation();
    this.toggleService.handleToggleEvent(this.type, !this.isActive());
  }

  private getIcon(): string {
    let data = this.getData()
    return data.isActive ? data.icon : data.iconAlt;
  }

  private getTooltip(): string {
    let data = this.getData()
    return data.isActive ? data.tooltip : data.tooltipAlt;
  }

  private isActive(): boolean {
    return this.getData().isActive;
  }

  private getData(): BtnToggleModel {
    let data = this.toggleService.appToggleBtnData().find(data => data.type === this.type)
    return !!data ? data : new BtnToggleModel();
  }
}