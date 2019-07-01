import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificItemsComponent } from './specific-items.component';

describe('SpecificItemsComponent', () => {
  let component: SpecificItemsComponent;
  let fixture: ComponentFixture<SpecificItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
