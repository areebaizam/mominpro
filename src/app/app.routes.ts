import { Routes } from '@angular/router';
//Components
import { PageNotFoundComponent } from '@shared/pages';
// Models
import { eFeatureRouteURL } from '@shared/models';

export const routes: Routes = [
    {
        path: eFeatureRouteURL.HOME,
        loadChildren: () => import("@features/home/routes"),
    },
    {
        path: eFeatureRouteURL.TIMINGS,
        loadChildren: () => import("@features/timings/routes"),
    },
    {
        path: eFeatureRouteURL.SETTINGS,
        loadChildren: () => import("@features/settings/routes"),
    },
    {
        path: "",
        redirectTo: eFeatureRouteURL.HOME,
        pathMatch: "full",
    },
    {
        path: "**",
        component:PageNotFoundComponent
    },
    
];
