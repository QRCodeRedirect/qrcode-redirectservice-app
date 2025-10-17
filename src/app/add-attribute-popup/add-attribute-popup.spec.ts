import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributePopup } from './add-attribute-popup';

describe('AddAttributePopup', () => {
  let component: AddAttributePopup;
  let fixture: ComponentFixture<AddAttributePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAttributePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttributePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
