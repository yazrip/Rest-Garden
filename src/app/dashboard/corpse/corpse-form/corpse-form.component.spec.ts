import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../../grave/model/grave-model';
import { Corpses } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';

import { CorpseFormComponent } from './corpse-form.component';

describe('UserFormComponent', () => {
  let component: CorpseFormComponent;
  let fixture: ComponentFixture<CorpseFormComponent>;
  let corpseService: CorpseService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpseFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [CorpseService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpseFormComponent);
    component = fixture.componentInstance;
    corpseService = TestBed.inject(CorpseService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

  });

  it('Components create', () => {
    expect(component).toBeTruthy();
  });

  it('UserForm check validity', () => {
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
    const corpseMock: Corpses =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        parentName: 'hai',
        location: 'hai',
        grave: grave,
    }

    component.id = corpseMock.id as string;
    component.setFormValues(corpseMock);
    expect(component.corpseForm.value).toEqual(corpseMock);
  })

  it('Should return false if form be set', () => {
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
    const corpseMock: Corpses =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        parentName: 'hai',
        location: 'hai',
        grave: grave,
    }
    component.setFormValues(corpseMock);
    const form: boolean = component.isValid();
    expect(form).toBeFalse();
  })

  it('Should return true if form be not set', () => {
    
    const form: boolean = component.isValid();
    expect(form).toBeTrue();
  })

  it('Should return is-valid if form null', () => {
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
    const corpseMock: Corpses =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
      name: 'hai',
      parentName: 'hai',
      location: 'hai',
      grave: grave,
    }
    component.setFormValues(corpseMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('is-valid');
  })

  it('Should return " " if form set and valid', () => {
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
    const corpseMock: Corpses =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
      name: 'hai',
      parentName: 'hai',
      location: 'hai',
      grave: grave,
    }
    component.setFormValues(corpseMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('');
  })

});

