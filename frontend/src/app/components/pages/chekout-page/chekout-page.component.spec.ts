import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekoutPageComponent } from './chekout-page.component';

describe('ChekoutPageComponent', () => {
  let component: ChekoutPageComponent;
  let fixture: ComponentFixture<ChekoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChekoutPageComponent]
    });
    fixture = TestBed.createComponent(ChekoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
