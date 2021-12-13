import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../model/grave-model';
import { GraveService } from '../service/grave.service';
import { GraveListComponent } from './grave-list.component';

describe('UserListComponent', () => {
  let component: GraveListComponent;
  let fixture: ComponentFixture<GraveListComponent>;
  let graveService: GraveService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraveListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [GraveListComponent, {
        provide: GraveService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraveListComponent);
    component = fixture.componentInstance;
    graveService = TestBed.inject(GraveService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should Showing Grave', () => {
  //   const graveMock: Grave[] = [
  //     {
  //       id: 'e2061e05-471f-1110-b64d-6ad8829f96eb',
  //       name: 'hello',
  //       type: 'hello',
  //       availableSlots: 12,
  //       phoneNumber: '089980231233',
  //       price: 12,
  //       address: 'hello',
  //       description: 'hello'
  //     },
  //     {
  //       id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
  //       name: 'hai',
  //       type: 'hai',
  //       availableSlots: 12,
  //       phoneNumber: '089980231233',
  //       price: 12,
  //       address: 'hai',
  //       description: 'hai'
  //     },
  //     {
  //       id: 'e2061e05-471f-2220-b64d-6ad8829f96eb',
  //       name: 'hallo',
  //       type: 'hallo',
  //       availableSlots: 12,
  //       phoneNumber: '089980231233',
  //       price: 12,
  //       address: 'hallo',
  //       description: 'hallo'
  //     },
  //   ];
  //   component.ngOnInit();
  //   component.graves = graveMock;
  //   expect(component.graves).toEqual(graveMock);
  //   expect(component.graves.length).toEqual(graveMock.length);
  // })
  it('Should onDelete isDefined', () => {
    expect(component.onDeleteGrave).toBeDefined();
  })
});
