import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBankAccountComponent } from './open-bank-account.component';

describe('OpenBankAccountComponent', () => {
  let component: OpenBankAccountComponent;
  let fixture: ComponentFixture<OpenBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
