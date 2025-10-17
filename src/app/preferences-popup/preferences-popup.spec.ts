import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesPopup } from './preferences-popup';

describe('PreferencesPopup', () => {
  let component: PreferencesPopup;
  let fixture: ComponentFixture<PreferencesPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferencesPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
