import { Routes } from '@angular/router';
import { eTestFeatureRouteURL } from '@test/models';

// Make the container class default
export const ROUTES: Routes = [
    {
        path: eTestFeatureRouteURL.COLORS,
        loadChildren: () => import("@test/features/colors/routes"),
        data: { breadcrumb: eTestFeatureRouteURL.COLORS }
    },
    {
        path: eTestFeatureRouteURL.TYPOGRAPHY,
        loadChildren: () => import("@test/features/typography/routes"),
        data: { breadcrumb: eTestFeatureRouteURL.TYPOGRAPHY }
    },
    { path: "", redirectTo: eTestFeatureRouteURL.COLORS, pathMatch: "full", },
];

export default ROUTES;