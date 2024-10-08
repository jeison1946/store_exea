import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@exeaenvironments';

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

  getGender(query: any) {
    let httpParams = new HttpParams();
    Object.keys(query).forEach(key => {
      httpParams = httpParams.append(key, query[key]);
    });
    const url = `${this.urlBase}/gender`;
    return this.httpClient.get(url, { params: httpParams});
  }

  getLastSong(pos: any) {
    const url = `${this.urlNode}/rules/logs?point_of_sale=${pos}&limit=1`;
    return this.httpClient.get(url);
  }

  getSongRequest(pos: string) {
    const url = `${this.urlNode}/song-request?pos=${pos}&finish=false`;
    return this.httpClient.get(url);
  }

  createdRequest(data: any, pos: string) {
    data.file_size = '0';
    data.pos = pos;
    const url = `${this.urlNode}/song-request`;
    return this.httpClient.post(url, data);
  }
}
