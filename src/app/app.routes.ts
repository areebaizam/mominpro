import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from '@core/guards';
//Components
import { LoginComponent, PageNotFoundComponent } from '@shared/pages';
// Models
import { FeatureURLConstants, PageURLConstants } from '@shared/models';


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
        path: PageURLConstants.FORBIDDEN,
        component:PageNotFoundComponent,
        data: { breadcrumb: PageURLConstants.FORBIDDEN } //Change it to label
    },
    {
        path: PageURLConstants.ERROR,
        component:PageNotFoundComponent,//TODO Make it broken server error
        data: { breadcrumb: PageURLConstants.ERROR } //Change it to label
    },
    {
        path: PageURLConstants.LOGIN,
        component:LoginComponent,
        canMatch:[LoginGuard],
        data: { breadcrumb: PageURLConstants.LOGIN }
    },
    {
        path: "**",
        component:PageNotFoundComponent,
        data: { breadcrumb: PageURLConstants.FORBIDDEN }
        //TODO rectify this
    },    
];
