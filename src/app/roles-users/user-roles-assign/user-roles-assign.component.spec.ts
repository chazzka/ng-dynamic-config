import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesAssignComponent } from './user-roles-assign.component';

describe('UserRolesAssignComponent', () => {
  let component: UserRolesAssignComponent;
  let fixture: ComponentFixture<UserRolesAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
