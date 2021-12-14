import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpseMenuComponent } from './corpse-menu.component';

describe('CorpseMenuComponent', () => {
  let component: CorpseMenuComponent;
  let fixture: ComponentFixture<CorpseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpseMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
