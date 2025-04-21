import { Routes } from '@angular/router';

// Make the container class default
export const ROUTES: Routes = [
    { path: "", loadComponent: () => import('./accounts.component').then(m=>m.default)},
];

export default ROUTES;