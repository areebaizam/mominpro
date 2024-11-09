import { BtnNavModel, BtnToggleModel, eBtnToggleType, eFeatureRouteURL } from "./common.model";

export const APP_TOGGLE_ICONS = [
    {
        icon: "menu_open",
        iconAlt: "menu",
        tooltip: "Close menu",
        tooltipAlt: "Open menu",
        isActive: false,
        type: eBtnToggleType.SIDENAV,
    },
    {
        icon: "mosque",
        iconAlt: "mosque",
        tooltip: "Home",
        tooltipAlt: "Home",
        isActive: false,
        type: eBtnToggleType.HOME,
    },
    {
        icon: "fullscreen_exit",
        iconAlt: "fullscreen",
        tooltip:"Exit full screen (f)",
        tooltipAlt:"Full screen (f)",
        isActive: false,
        type: eBtnToggleType.FULLSCREEN,
    },
    {
        icon: "light_mode",
        iconAlt: "dark_mode",
        tooltip:"Light mode (d)",
        tooltipAlt:"Dark mode (d)",
        isActive: false,
        type: eBtnToggleType.THEME,
    },
] as BtnToggleModel[]

export const APP_NAV_HOME_BTN = {
    order: 1,
    id: 1,
    parentId:null,
    icon: "mosque",
    label: "Home",
    url: eFeatureRouteURL.HOME,
    children:null
} as BtnNavModel;

export const APP_NAV_TEST_BTN = {
    order: 9,
    id: 9,
    parentId:null,
    icon: "experiment",
    label: "Test",
    url: eFeatureRouteURL.TEST,
    children:null
} as BtnNavModel;

export const APP_NAV_BTNS = [
    {
        order: 2,
        id: 2,
        parentId:null,
        icon: "schedule",
        label: "Timings",
        url: eFeatureRouteURL.TIMINGS,
        children:null
    }, 
    {
        order: 3,
        id: 3,
        parentId:null,
        icon: "settings",
        label: "Settings",
        url: eFeatureRouteURL.SETTINGS,
        children:null
    },
] as BtnNavModel[];
