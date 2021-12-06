import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/auth/model/login-model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from '../model/user-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required])
  })
  storage: Storage = sessionStorage;

  id?: String

  user?: User;

  constructor(
    private readonly userService: UserService, 
    private readonly router:Router, 
    private readonly activatedRoute:ActivatedRoute
    
    ) { }

  ngOnInit(): void {
    
  }

  addUser(): void {
    const user: User = this.userForm.value;
    console.log('user form value:', user);

    this.userService
      .addUser(user)
      .pipe()
      .subscribe((user: User) => {
        this.onReset()
        this.router.navigateByUrl("/user")
      },
      (error : any) => {
        console.error(error)
      },
      )
  }

  setFormValue(user: User){
    if (user) {
      this.userForm.addControl('id', new FormControl())
      this.userForm.setValue({
        id: this.id,
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address
      });

    }
  }

  onReset() {
    this.user = undefined;
    this.userForm.reset();
  }

  isValid(): boolean {
    return !this.userForm.get('username')?.value;
  }

  isFieldValid(fieldName: string): { [key: string]: boolean } {
    const control: AbstractControl = this.userForm.get(fieldName) as AbstractControl;

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
    const control: AbstractControl = this.userForm.get(fieldName) as AbstractControl;
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
