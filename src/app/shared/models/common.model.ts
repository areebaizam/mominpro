export enum eFeatureRouteURL {
    HOME = "",
    TIMINGS = "timings",
    SETTINGS = "settings",
    TEST = "test",
}

export type MatDrawerPosition = "start" | "end";
export enum eBtnToggleType {
    SIDENAV,
    FULLSCREEN,
    THEME,
    HOME,
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
    url: eFeatureRouteURL = eFeatureRouteURL.HOME;
    children: BtnNavModel[] | null = null;
  }