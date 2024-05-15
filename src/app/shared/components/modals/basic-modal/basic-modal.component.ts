import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './basic-modal.component.html',
  styleUrl: './basic-modal.component.scss'
})
export class BasicModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {}

  close() {
    this.dialog.closeAll();
  }
}
