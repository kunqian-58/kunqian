import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlanComponent } from './alan.component';

describe('AlanComponent', () => {
  let component: AlanComponent;
  let fixture: ComponentFixture<AlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
