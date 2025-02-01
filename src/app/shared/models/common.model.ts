import { FeatureURLConstants } from "./app.constants";

export type MatDrawerPosition = "start" | "end";
export enum eBtnToggleType {
    SIDENAV,
    FULLSCREEN,
    THEME,
    HOME,
}
export enum eBtnActionCESType{
    CANCEL='cancel',
    EDIT='edit',
    SAVE='save',
}

export class BtnToggleModel {
    icon: string ='';
    iconAlt: string='';
    tooltip: string='';
    tooltipAlt: string='';
    type: eBtnToggleType=eBtnToggleType.SIDENAV;
    isActive: boolean = true;
}

export class BtnNavModel {
    order: number = 0;
    id: number = 0;
    parentId: number | null = null;
    icon: string = '';
    label: string = '';
    url: FeatureURLConstants = FeatureURLConstants.HOME;
    children: BtnNavModel[] | null = null;
  }