import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AutocompleteComponent } from '@exeacomponents/autocomplete/autocomplete.component';
import { BasicModalComponent } from '@exeacomponents/modals/basic-modal/basic-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { SongService } from '@exeaservices/song.service';

@Component({
  selector: 'app-list-items-search',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './list-items-search.component.html',
  styleUrl: './list-items-search.component.scss'
})
export class ListItemsSearchComponent implements OnInit{

  @Input() label: string = '';
  @Input() type: string = 'music';
  @Input() pos: string | false = false;
  @Input() posstring: string | false = false;
  @Input() typeClosed: string | false = false;

  messageText: string | false = false;

  genderFilter: string | false = false;

  listOptions: any[] = [];

  constructor(
    public songService: SongService,
    public dialog: MatDialog
    ){
  }


  ngOnInit(): void {
    this.getOptions();
  }

  getOptions():void {
    if (this.type == 'music') {
      this.songService.getSong({ pos: this.pos }).subscribe((responseSong: any ) => {
        if(responseSong.code == 200) {
          this.listOptions = responseSong.payload;
        }
      },() => {})
    }
    if (this.type == 'gender') {
      this.songService.getGender({ pos: this.pos }).subscribe((responseSong: any ) => {
        if(responseSong.code == 200) {
          this.listOptions = responseSong.payload;
        }
      },() => {})
    }
  }

  eventClickOptions(item: any) {
    this.openDialog('gender');
    if (this.type == 'gender') {
      this.messageText = item.title;
      this.songService.getSong({ pos: this.pos, gender: item.id }).subscribe((responseSong: any ) => {
        if(responseSong.code == 200) {
          this.listOptions = responseSong.payload;
          this.type = 'music';
          this.genderFilter = item.id;
        }
      },() => {})
    } else {
      if (this.pos) {
        this.songService.createdRequest(item, this.pos).subscribe((responseSong: any ) => {
          if(responseSong.code == 200) {
            this.openDialog('general');
          }
        },(error) => {
          if (error.error.code == 500) {
            this.openDialog('custom', error.error.response.message);
          }
        })

      }

    }
  }

  openDialog(type: string, message: string = '') {
    let dialogRef = this.dialog.open(BasicModalComponent, {
      data: {
        message: type == 'custom' ? message : 'Tu canción fue programada exitosamente.',
      },
    });
    let instance = dialogRef.componentInstance;
    instance.textButton = type == 'custom' ? 'Continua programando' : 'Ver canciones programadas';
    instance.pos = this.posstring;
    instance.type = type;
  }

  searchEvent(event: any) {
    if (this.type == 'music') {
      const filters: any = {
        pos: this.pos,
        title: event,
      }
      if (this.genderFilter) filters.gender = this.genderFilter;
      this.songService.getSong(filters).subscribe((responseSong: any ) => {
        if(responseSong.code == 200) {
          this.listOptions = responseSong.payload;
        }
      },() => {})
    }
    if (this.type == 'gender') {
      this.songService.getGender({
        pos: this.pos,
        title: event,
      }).subscribe((responseSong: any ) => {
        if(responseSong.code == 200) {
          this.listOptions = responseSong.payload;
        }
      },() => {})
    }
  }

  returnGender() {
    this.type = 'gender';
    this.messageText = 'Nuestro menú de géneros';
    this.songService.getGender({ pos: this.pos }).subscribe((responseSong: any ) => {
      if(responseSong.code == 200) {
        this.listOptions = responseSong.payload;
      }
    },() => {})
  }
}
