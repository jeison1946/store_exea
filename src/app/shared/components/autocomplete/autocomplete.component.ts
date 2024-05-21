import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatIconModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {

  @Input() label: string = '';
  @Output() searchEvent = new EventEmitter<any>();

  changeInput( event:any ):void {
    this.searchEvent.emit(event.srcElement.value);
  }
}
