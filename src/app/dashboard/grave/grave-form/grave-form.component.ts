import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { messages } from 'src/environments/environment';
import { Grave } from '../model/grave-model';
import { GraveService } from '../service/grave.service';

@Component({
  selector: 'app-grave-form',
  templateUrl: './grave-form.component.html',
  styleUrls: ['./grave-form.component.scss']
})
export class GraveFormComponent implements OnInit {

  image?: File
  linkGambar: string | undefined;

  graveForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl([Validators.required]),
    availableSlots: new FormControl('', [Validators.required, Validators.min(0)]),
    phoneNumber: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  id: string | null = null;

  setFormValues(grave: Grave): void {
    this.graveForm.addControl('id', new FormControl);
    this.graveForm.get('id')?.setValue(grave.id);
    this.graveForm.get('name')?.setValue(grave.name);
    this.graveForm.get('type')?.setValue(grave.type);
    this.graveForm.get('availableSlots')?.setValue(grave.availableSlots);
    this.graveForm.get('phoneNumber')?.setValue(grave.phoneNumber);
    this.graveForm.get('price')?.setValue(grave.price);
    this.graveForm.get('address')?.setValue(grave.address);
    this.graveForm.get('description')?.setValue(grave.description);
    // this.graveForm.get('image')?.setValue(grave.image);
  }

  grave?: Grave;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly graveService: GraveService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if (!id) { return EMPTY }
        else { this.id = id; return this.graveService.getGravesById(id) }
      })
    ).subscribe(
      (grave: Grave) => {
        if (grave) {
          this.setFormValues(grave);
          this.linkGambar = grave.image
          console.log(this.linkGambar);
          
        }
      },
      (error) => console.error(error),
      () => { }
    )
  }

  addGrave(): void {
    const grave: Grave = this.graveForm.value;
    console.log('grave form value:', grave);
    this.image = this.graveForm.get('image')?.value 

    if (this.graveForm.get('price')?.value < 0) {
      this.graveForm.get('price')?.setValue(0)
    }else if (this.graveForm.get('availableSlots')?.value < 0) {
      this.graveForm.get('availableSlots')?.setValue(0)
    }else if (this.graveForm.get('image')?.value == "") {
      grave.image = this.linkGambar?.toString();
      this.graveService.createWithoutImage(grave)
      .pipe()
      .subscribe((grave: Grave)=> {
        this.onReset()
        this.router.navigateByUrl("/dashboard/grave")
      },
      (error : any) => {
        console.error(error)
      },
      )
    }else {
      this.graveService
      .createGrave(grave, this.image)
      .pipe()
      .subscribe((grave: Grave)=> {
        this.onReset()
        this.router.navigateByUrl("/dashboard/grave")
      },
      (error : any) => {
        console.error(error)
      },
      )
    }
    
  }

  isValid(): boolean {
    return !this.graveForm.get('username')!.value;
  }

  isFieldValid(fieldName: string): { [key: string]: boolean } {
    const control: AbstractControl = this.graveForm.get(fieldName) as AbstractControl;

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
    const control: AbstractControl = this.graveForm.get(fieldName) as AbstractControl;
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

  onReset(): void {
    this.grave = undefined;
    this.graveForm.reset();
  }

  handleFileUpload(event: any): void {
    const files: FileList = event.target.files;
    console.log(event.target.files);
    
    if (files) {
      this.image = files.item(0) as File;
      this.graveForm.get('image')?.setValue(this.image)
    }
  }
}
