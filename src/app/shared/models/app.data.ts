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
    {
        icon: "fullscreen_exit",
        iconAlt: "fullscreen",
        tooltip:"Exit full screen (f)",
        tooltipAlt:"Full screen (f)",
        isActive: false,
        type: eBtnToggleType.FULLSCREEN,
    },
    {
        icon: "dark_mode",
        iconAlt: "light_mode",
        tooltip:"Switch to dark mode (d)",
        tooltipAlt:"Switch to light mode (d)",
        isActive: false,
        type: eBtnToggleType.THEME,
    },
] as BtnToggleModel[]