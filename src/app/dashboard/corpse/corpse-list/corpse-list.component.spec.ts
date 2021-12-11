import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../../grave/model/grave-model';
import { Corpses } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';

import { CorpseListComponent } from './corpse-list.component';

describe('UserListComponent', () => {
  let component: CorpseListComponent;
  let fixture: ComponentFixture<CorpseListComponent>;
  let corpseService: CorpseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpseListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [CorpseListComponent, {
        provide: CorpseService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseListComponent);
    component = fixture.componentInstance;
    corpseService = TestBed.inject(CorpseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Showing Corpse', () => {
    const grave: Grave = {
      id: '1',
      address: 'Jl Bareng',
      availableSlots: 10,
      description: 'Ada AC',
      name: 'Jiha',
      phoneNumber: '091212',
      price: 60000,
      type: 'Private'
    }
    const corpseMock: Corpses[] = [
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        parentName: 'hai',
        location: 'hai',
        grave: grave,
      },
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        parentName: 'hai',
        location: 'hai',
        grave: grave,
      },
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        parentName: 'hai',
        location: 'hai',
        grave: grave,
      },
    ];
    component.ngOnInit();
    component.corpses = corpseMock;
    expect(component.corpses).toEqual(corpseMock);
    expect(component.corpses.length).toEqual(corpseMock.length);
  })
});
