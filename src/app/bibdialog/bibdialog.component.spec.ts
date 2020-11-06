import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibdialogComponent } from './bibdialog.component';

describe('BibdialogComponent', () => {
  let component: BibdialogComponent;
  let fixture: ComponentFixture<BibdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
