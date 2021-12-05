import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpseFormComponent } from './corpse-form.component';

describe('CorpseFormComponent', () => {
  let component: CorpseFormComponent;
  let fixture: ComponentFixture<CorpseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
