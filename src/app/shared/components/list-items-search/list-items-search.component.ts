import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() currentAction = new EventEmitter<string>();

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

  async eventClickOptions(item: any) {
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
        const max = 5;
        let flag = false;
        let currentCount:any = parseInt(localStorage.getItem('currentCount') ?? '0');
        const currentDate: any = new Date();
        const lastDate: any = localStorage.getItem('currentTime')
        if (currentCount >= max) {
          const providedDate = new Date(lastDate);
          const diffInMs = currentDate.getTime() - providedDate.getTime();
          const diffInMinutes = diffInMs / (1000 * 60);
          if (diffInMinutes > 30) {
            flag = true;
            localStorage.setItem('currentCount', '0')
          }
        } else {
          flag = true;
        }

        if (flag) {
          this.songService.createdRequest(item, this.pos).subscribe((responseSong: any ) => {
            if(responseSong.code == 200) {
              currentCount++;
              localStorage.setItem('currentCount', currentCount)
              if (currentCount == max) {
                localStorage.setItem('currentTime', currentDate )
              }
              this.openDialog('message-success.png', 'see_more');
            }
          },(error) => {
            if (error.error.code == 500) {
              this.openDialog('message-exist.png', 'continue');
            }
          })
        }
        else {
          this.openDialog('message-block.png');
        }
      }
    }
  }

  openDialog(type: string, typeAction: string = '') {
    let dialogRef = this.dialog.open(BasicModalComponent, {
      data: {
        image: type,
      },
    });
    let instance = dialogRef.componentInstance;
    instance.type = typeAction;
    instance.clockTick.subscribe(data => {
      this.currentAction.emit(data);
    })
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
