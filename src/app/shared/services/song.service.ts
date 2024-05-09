import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@media/environments';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private urlBase = environment.apiUrl;
  private urlNode = environment.apiNode;

  constructor(private httpClient: HttpClient) {
  }

  getSong(query: any) {
    let httpParams = new HttpParams();
    Object.keys(query).forEach(key => {
      httpParams = httpParams.append(key, query[key]);
    });
    const url = `${this.urlBase}/song`;
    return this.httpClient.get(url, { params: httpParams});
  }

  getLastSong(pos: any) {
    const url = `${this.urlNode}/rules/logs?point_of_sale=${pos}&limit=1`;
    return this.httpClient.get(url);
  }
}
