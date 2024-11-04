import { Routes } from '@angular/router';

// Make the container class default
export const ROUTES: Routes = [
    { path: "", loadComponent: () => import('./settings.component')},
];

export default ROUTES;