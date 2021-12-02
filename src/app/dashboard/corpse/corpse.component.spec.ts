import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpseComponent } from './corpse.component';

describe('CorpseComponent', () => {
  let component: CorpseComponent;
  let fixture: ComponentFixture<CorpseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
