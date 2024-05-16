import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './basic-modal.component.html',
  styleUrl: './basic-modal.component.scss'
})
export class BasicModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router
  ) {}
  @Input() textButton: false | string = false;
  @Input() pos: false | string = false;
  @Input() type: false | string = false;


  close() {
    this.dialog.closeAll();
  }

  actionButton() {
    if (this.pos && this.type) {
      this.router.navigate([`/store/${this.pos}?type=${this.type}`]);
    }
     this.dialog.closeAll();
  }
}
