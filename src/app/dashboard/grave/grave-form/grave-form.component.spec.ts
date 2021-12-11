import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../model/grave-model';
import { GraveService } from '../service/grave.service';

import { GraveFormComponent } from './grave-form.component';

describe('UserFormComponent', () => {
  let component: GraveFormComponent;
  let fixture: ComponentFixture<GraveFormComponent>;
  let graveService: GraveService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraveFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [GraveService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraveFormComponent);
    component = fixture.componentInstance;
    graveService = TestBed.inject(GraveService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

  });

  it('Components create', () => {
    expect(component).toBeTruthy();
  });

  it('UserForm check validity', () => {
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }

    component.id = graveMock.id as string;
    component.setFormValues(graveMock);
    expect(component.graveForm.value).toEqual(graveMock);
  })

  it('Should return false if form be set', () => {
    const graveMock: Grave =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
      name: 'hai',
      type: 'hai',
      availableSlots: 12,
      phoneNumber: '089980231233',
      price: 12,
      address: 'hai',
      description: 'hai'
    }
    component.setFormValues(graveMock);
    const form: boolean = component.isValid();
    expect(form).toBeFalse();
  })

  it('Should return true if form be not set', () => {
    
    const form: boolean = component.isValid();
    expect(form).toBeTrue();
  })

  it('Should return is-valid if form null', () => {
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }
    component.setFormValues(graveMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('is-valid');
  })

  it('Should return " " if form set and valid', () => {
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }
    component.setFormValues(graveMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('');
  })

});
