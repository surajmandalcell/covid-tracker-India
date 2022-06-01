import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwarnessComponent } from './awarness.component';

describe('AwarnessComponent', () => {
  let component: AwarnessComponent;
  let fixture: ComponentFixture<AwarnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwarnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
