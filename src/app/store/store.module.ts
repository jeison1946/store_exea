import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '@exeaenvironments';

@NgModule({
  declarations: [],
  imports: [
    SocketIoModule.forRoot({ url: environment.apiNode, options: {} }),
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
