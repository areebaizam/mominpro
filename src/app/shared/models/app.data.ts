import { BtnToggleModel, eBtnToggleType } from "./common.model";

export const APP_TOGGLE_ICONS = [
    {
        icon: "menu_open",
        iconAlt: "menu",
        tooltip: "Close menu",
        tooltipAlt: "Open menu",
        isActive: false,
        type: eBtnToggleType.SIDENAV,
    },
] as BtnToggleModel[]