import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Grave } from '../../grave/model/grave-model';
import { GraveService } from '../../grave/service/grave.service';
import { Corpses } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';

@Component({
  selector: 'app-corpse-form2',
  templateUrl: './corpse-form2.component.html',
  styleUrls: ['./corpse-form2.component.scss']
})
export class CorpseForm2Component implements OnInit {

  corpseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    graveId: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    parentName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
  });
  id: string | null = null;

  setFormValues(corpse: Corpses): void {
    this.corpseForm.addControl('id', new FormControl);
    this.corpseForm.get('id')?.setValue(corpse.id);
    this.corpseForm.get('name')?.setValue(corpse.name);
    this.corpseForm.get('graveId')?.setValue(corpse.grave.id);
    this.corpseForm.get('location')?.setValue(corpse.location);
    this.corpseForm.get('parentName')?.setValue(corpse.parentName);
    this.corpseForm.get('birthDate')?.setValue(corpse.birthDate);
  }
  graves: Grave[] = [];
  corpse?: Corpses;
  subscriber?: Observer<any>

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly corpseService: CorpseService,
    private readonly router: Router,
    private readonly graveService: GraveService
  ) { }

  ngOnInit(): void {
    this.getAllGrave()
    this.activatedRoute.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if (!id) { return EMPTY }
        else { this.id = id; return this.corpseService.getCorpseById(id) }
      })
    ).subscribe(
      (corpse: Corpses) => {
        if (corpse) {
          this.setFormValues(corpse);
        }
      },
      (error) => console.error(error),
      () => { }
    )
  }

  getAllGrave(){
    this.subscriber = {
      next: (data: any) => {this.graves = data, console.log(data)},
      error: console.error,
      complete: () => {},
    };

    this.graveService.getAllGraves().pipe().subscribe(this.subscriber)
  }

  addCorpse(): void {
    const corpse: Corpses = this.corpseForm.value;
    console.log('corpse form value:', corpse);

    this.corpseService
      .addCorpse(corpse)
      .pipe()
      .subscribe((corpse: Corpses)=> {
        this.onReset()
        // this.router.navigateByUrl("/dashboard/corpse")
      },
      (error : any) => {
        console.error(error)
      },
      )
    
  }

  onReset(): void {
    this.corpse = undefined;
    this.corpseForm.reset();
  }

  isValid(): boolean {
    return !this.corpseForm.get('username')!.value;
  }

  isFieldValid(fieldName: string): { [key: string]: boolean } {
    const control: AbstractControl = this.corpseForm.get(fieldName) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false
    }

    control.valid;
    control.invalid;
    control.dirty;
    control.touched;

    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    }else if (control && control.valid) {
      classes['is-valid'] = true;
    }
    return classes
  }

  displayErrors(fieldName:string):string {
    const control: AbstractControl = this.corpseForm.get(fieldName) as AbstractControl;
    const messages: any = {
      "required":"Field must be filled"
    }

    if (control && control.errors) {
      const error = Object.values(control.errors).pop();
      const key: string = Object.keys(control.errors).pop() as string;

      let message = messages[key];

      console.log(message);

      if (key === 'minlength') {
        console.log(error);

        message = message.replace('{minlength}', error.requiredLength)
      }
      return message;
    }else{
      return '';
    }
  }

}
