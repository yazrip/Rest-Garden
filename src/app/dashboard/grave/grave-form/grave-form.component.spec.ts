import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraveFormComponent } from './grave-form.component';

describe('GraveFormComponent', () => {
  let component: GraveFormComponent;
  let fixture: ComponentFixture<GraveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
