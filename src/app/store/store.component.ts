import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { ActivatedRoute } from '@angular/router';
import { AutocompleteComponent } from '@media/autocomplete/autocomplete.component';
import { SongService } from '../shared/services/song.service';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { BasicModalComponent } from '@media/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatListModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {

  pointOfSale: string = '';

  dataInfo: any;

  listOptions: any[] = [];

  currentSong: any;

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
        this.songService.getSong({ pos: this.dataInfo.pos }).subscribe((responseSong: any ) => {
          if(responseSong.code == 200) {
            this.listOptions = responseSong.payload;
          }
        },() => {})
        this.songService.getLastSong(this.dataInfo.pos).subscribe((responseLog: any ) => {
          if(responseLog.code == 200) {
            this.currentSong = responseLog.response;
          }
        },() => {})
      }
    },() => {})
  }

  updateDateList(event: any) {
    this.songService.getSong({ pos: this.dataInfo.pos, title: event }).subscribe((responseSong: any ) => {
      if(responseSong.code == 200) {
        this.listOptions = responseSong.payload;
      }
    },
    () => {})
  }

  addResquestLog() {
    this.dialog.open(BasicModalComponent, {
      data: {
        message: 'Tu canción fye programada exitosamente.',
      },
    });
  }
}
