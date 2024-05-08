import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { ActivatedRoute } from '@angular/router';
import { AutocompleteComponent } from '@media/autocomplete/autocomplete.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    AutocompleteComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {

  pointOfSale: string = '';

  constructor(private route: ActivatedRoute, public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getStore();
  }

  getStore() {
    this.pointOfSale = this.route.snapshot.paramMap.get('id') ?? '';
    /* this.storeService.getStore(this.pointOfSale).subscribe((response: any ) => {
      if(response.code == 200) {
        console.log(response);
      }
    }) */
  }
}
