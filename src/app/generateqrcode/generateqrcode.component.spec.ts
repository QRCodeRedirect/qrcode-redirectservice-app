import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateqrcodeComponent } from './generateqrcode.component';

describe('GenerateqrcodeComponent', () => {
  let component: GenerateqrcodeComponent;
  let fixture: ComponentFixture<GenerateqrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateqrcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
