import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoasterComponent } from './project-roaster.component';

describe('ProjectRoasterComponent', () => {
  let component: ProjectRoasterComponent;
  let fixture: ComponentFixture<ProjectRoasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRoasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
