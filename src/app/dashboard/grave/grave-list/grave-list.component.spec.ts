import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraveListComponent } from './grave-list.component';

describe('GraveListComponent', () => {
  let component: GraveListComponent;
  let fixture: ComponentFixture<GraveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
