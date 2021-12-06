import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/auth/model/login-model';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  data!: Login;

  authForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })
  storage: Storage = sessionStorage;

  constructor(private readonly authService:AuthService, private readonly router:Router, private readonly activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    
  }

  isValid(): boolean {
    return !this.authForm.get('username')?.value;
  }

  isFieldValid(fieldName: string): { [key: string]: boolean } {
    const control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;

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
    const control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;
    const messages: any = {
      "required":"Field Harus di isi",
      "minlength":"Field Minimal harus lebih panjang dari {minlength}",
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
