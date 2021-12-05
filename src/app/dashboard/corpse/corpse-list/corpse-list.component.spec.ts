import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpseListComponent } from './corpse-list.component';

describe('CorpseListComponent', () => {
  let component: CorpseListComponent;
  let fixture: ComponentFixture<CorpseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
