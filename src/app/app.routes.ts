import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
//Components
import { LoginComponent, PageNotFoundComponent } from '@shared/pages';
// Models
import { FeatureURLConstants, PagesURLConstants } from '@shared/models';


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
        canMatch:[AuthGuard],
        data: { breadcrumb: FeatureURLConstants.ACCOUNTS }
    },
    {
        path: FeatureURLConstants.TEST,
        loadChildren: () => import("@test/routes"),
        data: { breadcrumb: FeatureURLConstants.TEST }
    },
    {
        path: PagesURLConstants.FORBIDDEN,
        component:PageNotFoundComponent,
    },
    {
        path: PagesURLConstants.LOGIN,
        component:LoginComponent,
    },
    {
        path: "**",
        component:PageNotFoundComponent
    },    
];
