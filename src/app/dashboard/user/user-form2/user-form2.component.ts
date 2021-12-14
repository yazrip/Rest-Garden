import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { User } from '../model/user-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-form2',
  templateUrl: './user-form2.component.html',
  styleUrls: ['./user-form2.component.scss']
})
export class UserForm2Component implements OnInit {

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });
  
  id: string | null = null;

  setFormValues(user: User): void {
    this.userForm.addControl('id', new FormControl);
    this.userForm.get('id')?.setValue(user.id);
    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('username')?.setValue(user.username);
    this.userForm.get('password')?.setValue(user.password);
    this.userForm.get('address')?.setValue(user.address);
    this.userForm.get('email')?.setValue(user.email);
    this.userForm.get('phoneNumber')?.setValue(user.phoneNumber);
  }

  storage: Storage = sessionStorage;

  user?: User;

  constructor(
    private readonly userService: UserService, 
    private readonly router:Router, 
    private readonly activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.pipe(
    //   map((params: any) => params.id),
    //   switchMap((id: string) => {
    //     if (!id) { return EMPTY }
    //     else { this.id = id; return this.userService.getUsersById(id) }
    //   })
    // ).subscribe(
    //   (user: User) => {
    //     if (user) {
    //       this.setFormValues(user);
    //     }
    //   },
    //   (error) => console.error(error),
    //   () => { }
    // )
    this.activatedRoute.params.pipe(
      map((params: any) => params.id),
      switchMap((id: string) => {
        if (!id) { return EMPTY }
        else { this.id = id; return this.userService.getUsersById(id) }
      })
    ).subscribe(
      (user: User) => {
        if (user) {
          this.id = user.id
          this.setFormValues(user);
        }
      },
      (error) => console.error(error),
      () => { }
    )
  }

  addUser(): void {
    const user: User = this.userForm.value;
    console.log('user form value:', user);

    this.userService
      .addUser(user)
      .pipe()
      .subscribe((user: User) => {
        this.onReset()
        this.router.navigateByUrl("/dashboard/user")
      },
      (error : any) => {
        console.error(error)
      },
      )
  }

  onReset() {
    this.user = undefined;
    this.userForm.reset();
  }

  isValid(): boolean {
    return !this.userForm.get('username')!.value;
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
