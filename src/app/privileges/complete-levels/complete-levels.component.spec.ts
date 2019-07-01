import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLevelsComponent } from './complete-levels.component';

describe('CompleteLevelsComponent', () => {
  let component: CompleteLevelsComponent;
  let fixture: ComponentFixture<CompleteLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
