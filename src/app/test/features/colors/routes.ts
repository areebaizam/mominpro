import { Routes } from '@angular/router';

// Make the container class default
export const ROUTES: Routes = [
    { path: "", loadComponent: () => import('./colors.component')},
];

export default ROUTES;