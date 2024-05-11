import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../shared/services/song.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ListItemsSearchComponent } from '@exeacomponents/list-items-search/list-items-search.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ListItemsSearchComponent,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {

  pointOfSale: string = '';

  dataInfo: any;

  currentSong: any;

  component: number = 1;

  itemsRequestSons: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public storeService: StoreService,
    public songService: SongService,
    public dialog: MatDialog
    ){
  }

  ngOnInit(): void {

    this.getInitialData();


  }

  getInitialData() {
    this.pointOfSale = this.route.snapshot.paramMap.get('id') ?? '';
    this.storeService.getStore(this.pointOfSale).subscribe((response: any ) => {
      if(response.code == 200) {
        this.dataInfo = response.payload;
        this.songService.getLastSong(this.dataInfo.pos).subscribe((responseLog: any ) => {
          if(responseLog.code == 200) {
            this.currentSong = responseLog.response;
          }
        },() => {})
      }
    },() => {})
  }

  changeComponent(target: number) {
    this.component = target;
    if (target == 2) {
      this.getSongRequest();
    }
  }

  getSongRequest() {
    this.songService.getSongRequest(this.dataInfo.pos).subscribe((responseLog: any ) => {
      if(responseLog.code == 200) {
        this.itemsRequestSons = responseLog.response;
      }
    },() => {})
  }
}
