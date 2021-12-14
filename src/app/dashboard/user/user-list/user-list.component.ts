import { Component, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
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
  id!: string;
  subscriber?: Observer<any>

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5,10,20,50],
      pageLength: 5,
      // processing: true
    };
    this.getAllUser()
    // this.userService.listUpdated()
    //   .subscribe((updated: boolean) => {
    //   if (updated) {
    //     this.getAllUser();
    //   }
    // });
  }
  setId(id: string){
    this.id = id;
  }
  getAllUser() {
    this.subscriber = {
      next: (data: any) => {
        this.users = data; 
        console.log(data);
        this.dtTrigger.next();
       },
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
