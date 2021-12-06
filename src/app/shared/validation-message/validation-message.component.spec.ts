import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl } from "@angular/forms";
import { ValidationMessageComponent } from "./validation-message.component";

describe('ValidationMessageComponent()', ()=>{
  let fixture: ComponentFixture<ValidationMessageComponent>
  let element: HTMLElement;
  let component: ValidationMessageComponent;

  beforeEach(async ()=> {
    await TestBed.configureTestingModule({
      declarations: [ValidationMessageComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(ValidationMessageComponent)
    element = fixture.nativeElement;
    component = fixture.componentInstance;
    // element = fixture.nativeElement.querySelector("app-header");
  });

  it('Should create the ValidationMessageComponent', ()=>{
    fixture = TestBed.createComponent(ValidationMessageComponent)
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })

  it('Should create the ValidationMessageComponent', ()=>{
    expect(component.isFieldValid).toBeDefined();
  })

  it('Should create the ValidationMessageComponent', ()=>{
    expect(component.displayErrors).toBeDefined();
  })

})
