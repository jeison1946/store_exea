import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  imports: [],
  templateUrl: './basic-modal.component.html',
  styleUrl: './basic-modal.component.scss'
})
export class BasicModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
