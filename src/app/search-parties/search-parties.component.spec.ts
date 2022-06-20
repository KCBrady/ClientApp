import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartiesComponent } from './search-parties.component';

describe('SearchPartiesComponent', () => {
  let component: SearchPartiesComponent;
  let fixture: ComponentFixture<SearchPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
