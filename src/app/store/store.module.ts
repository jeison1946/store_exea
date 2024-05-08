import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        loadComponent: () => import('./store.component').then(m => m.StoreComponent)
      },
    ])
  ],
})
export class StoreModule { }
