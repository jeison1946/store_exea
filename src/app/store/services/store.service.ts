import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@exeaenvironments';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private urlBase = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getStore(path: string) {
    const url = `${this.urlBase}/store?path=${path}`;
    return this.httpClient.get(url);
  }
}
