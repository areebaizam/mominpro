import { Routes } from '@angular/router';
//Components
import { PageNotFoundComponent } from '@shared/pages';
// Models
import { eFeatureRouteURL } from '@shared/models';

export const routes: Routes = [
    {
        path: eFeatureRouteURL.HOME,
        loadChildren: () => import("@features/home/routes"),
        data: { breadcrumb: 'Home' }
    },
    {
        path: eFeatureRouteURL.TIMINGS,
        loadChildren: () => import("@features/timings/routes"),
        data: { breadcrumb: eFeatureRouteURL.TIMINGS }
    },
    {
        path: eFeatureRouteURL.SETTINGS,
        loadChildren: () => import("@features/settings/routes"),
        data: { breadcrumb: eFeatureRouteURL.SETTINGS }
    },
    {
        path: eFeatureRouteURL.TEST,
        loadChildren: () => import("@test/routes"),
        data: { breadcrumb: eFeatureRouteURL.TEST }
    },
    // {
    //     path: "",
    //     redirectTo: eFeatureRouteURL.HOME,
    //     pathMatch: "full",
    // },
    {
        path: "**",
        component:PageNotFoundComponent
    },    
];
