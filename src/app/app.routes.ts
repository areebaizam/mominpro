import { Routes } from '@angular/router';
//Components
import { PageNotFoundComponent } from '@shared/pages';
// Models
import { FeatureURLConstants } from '@shared/models';

export const routes: Routes = [
    {
        path: FeatureURLConstants.HOME,
        loadChildren: () => import("@features/home/routes"),
        data: { breadcrumb: 'Home' }
    },
    {
        path: FeatureURLConstants.TIMINGS,
        loadChildren: () => import("@features/timings/routes"),
        data: { breadcrumb: FeatureURLConstants.TIMINGS }
    },
    {
        path: FeatureURLConstants.SETTINGS,
        loadChildren: () => import("@features/settings/routes"),
        data: { breadcrumb: FeatureURLConstants.SETTINGS }
    },
    {
        path: FeatureURLConstants.ACCOUNTS,
        loadChildren: () => import("@features/accounts/routes"),
        data: { breadcrumb: FeatureURLConstants.ACCOUNTS }
    },
    {
        path: FeatureURLConstants.TEST,
        loadChildren: () => import("@test/routes"),
        data: { breadcrumb: FeatureURLConstants.TEST }
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
