import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsSearchComponent } from './list-items-search.component';

describe('ListItemsSearchComponent', () => {
  let component: ListItemsSearchComponent;
  let fixture: ComponentFixture<ListItemsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListItemsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
