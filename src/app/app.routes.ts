import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
  }
];
