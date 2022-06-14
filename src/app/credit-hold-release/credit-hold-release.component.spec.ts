import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditHoldReleaseComponent } from './credit-hold-release.component';

describe('CreditHoldReleaseComponent', () => {
  let component: CreditHoldReleaseComponent;
  let fixture: ComponentFixture<CreditHoldReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditHoldReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditHoldReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
