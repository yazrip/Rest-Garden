import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpseForm2Component } from './corpse-form2.component';

describe('CorpseForm2Component', () => {
  let component: CorpseForm2Component;
  let fixture: ComponentFixture<CorpseForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpseForm2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
