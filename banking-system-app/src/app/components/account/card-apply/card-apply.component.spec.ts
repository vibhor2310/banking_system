import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApplyComponent } from './card-apply.component';

describe('CardApplyComponent', () => {
  let component: CardApplyComponent;
  let fixture: ComponentFixture<CardApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardApplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
