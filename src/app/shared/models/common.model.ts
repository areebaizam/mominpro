export type MatDrawerPosition = "start" | "end";
export enum eBtnToggleType {
    TOGGLE,
    FULLSCREEN,
    THEME,
}

export class BtnToggleModel {
    icon: string ='';
    iconAlt: string='';
    tooltip: string='';
    tooltipAlt: string='';
    type: eBtnToggleType=eBtnToggleType.TOGGLE;
    isActive: boolean = true;
}