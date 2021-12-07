import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  subscriber?: Observer<any>

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser()
    this.userService.listUpdated()
      .subscribe((updated: boolean) => {
      if (updated) {
        this.getAllUser();
      }
    });
  }
  getAllUser() {
    this.subscriber = {
      next: (data: any) => {this.users = data, console.log(data)},
      error: console.error,
      complete: () => {},
    }

    this.userService.getAllUsers().pipe().subscribe(this.subscriber)
  }

  onDeleteUser(id: string): void {
    this.subscriber = {
      next: (users: User[]) => {
        console.log('user deleted');
        this.users = users;
      },
      error: console.error,
      complete: () => {

      },
    };

    this.userService.deleteUser(id)
      .pipe(
        switchMap(() => this.userService.getAllUsers())
      )
      .subscribe(this.subscriber);
  }

}
