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
        tooltip:"Switch to light mode (d)",
        tooltipAlt:"Switch to dark mode (d)",
        isActive: false,
        type: eBtnToggleType.THEME,
    },
] as BtnToggleModel[]

export const APP_NAV_BTNS = [
    {
        order: 1,
        id: 1,
        parentId:null,
        icon: "schedule",
        label: "Timings",
        url: eFeatureRouteURL.TIMINGS,
        children:null
    }, 
    {
        order: 2,
        id: 2,
        parentId:null,
        icon: "settings",
        label: "Settings",
        url: eFeatureRouteURL.SETTINGS,
        children:null
    },
] as BtnNavModel[];
