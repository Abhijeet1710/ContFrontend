import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedProjectsComponent } from './participated-projects.component';

describe('ParticipatedProjectsComponent', () => {
  let component: ParticipatedProjectsComponent;
  let fixture: ComponentFixture<ParticipatedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatedProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipatedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
