import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPrivilegesComponent } from './operational-privileges.component';

describe('OperationalPrivilegesComponent', () => {
  let component: OperationalPrivilegesComponent;
  let fixture: ComponentFixture<OperationalPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
