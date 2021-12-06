import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Validation } from '../shared/model/interface-model';
import { Login } from './model/login-model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  data!: Login;

  authForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })
  storage: Storage = sessionStorage;

  constructor(private readonly authService:AuthService, private readonly router:Router, private readonly activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(map((params:any)=>params.action))
    .subscribe((action) => {
      if (action == 'logout') {
        sessionStorage.removeItem('token')
        this.router.navigateByUrl('/auth')
      }
      else if (sessionStorage.getItem('token') && action == 'login') {
        this.router.navigateByUrl('/')
      }
    })
  }

  onSubmit() {
    console.log('Login value : ', this.authForm.value);
    if (this.authForm.valid) {
      this.authService
      .signin(this.authForm.value)
      .subscribe((response:any) => {
        sessionStorage.setItem('token', response.token),
        sessionStorage.setItem('username', this.authForm.get('username')?.value)
      }, console.error)
      this.router.navigateByUrl('/dashboard')
    }
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

  // displayErrors(fieldName:string):string {
  //   const control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;
  //   const messages: any = {
  //     "required":"Field must be filled"
  //   }

  //   if (control && control.errors) {
  //     const error = Object.values(control.errors).pop();
  //     const key: string = Object.keys(control.errors).pop() as string;

  //     let message = messages[key];

  //     console.log(message);

  //     if (key === 'minlength') {
  //       console.log(error);

  //       message = message.replace('{minlength}', error.requiredLength)
  //     }
  //     return message;
  //   }else{
  //     return '';
  //   }
  // }
}
