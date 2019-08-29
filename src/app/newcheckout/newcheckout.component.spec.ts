import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcheckoutComponent } from './newcheckout.component';

describe('NewcheckoutComponent', () => {
  let component: NewcheckoutComponent;
  let fixture: ComponentFixture<NewcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
