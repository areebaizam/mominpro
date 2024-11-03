export type MatDrawerPosition = "start" | "end";
export enum eBtnToggleType {
    SIDENAV,
    FULLSCREEN,
    THEME,
}

export class BtnToggleModel {
    icon: string ='';
    iconAlt: string='';
    tooltip: string='';
    tooltipAlt: string='';
    type: eBtnToggleType=eBtnToggleType.SIDENAV;
    isActive: boolean = true;
}