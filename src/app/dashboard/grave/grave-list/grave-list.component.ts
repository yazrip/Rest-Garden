import { Component, Input, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Grave } from '../model/grave-model';
import { GraveService } from '../service/grave.service';

@Component({
  selector: 'app-grave-list',
  templateUrl: './grave-list.component.html',
  styleUrls: ['./grave-list.component.scss']
})
export class GraveListComponent implements OnInit {

  graves: Grave[] = [];
  subscriber?: Observer<any>

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private readonly graveService: GraveService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5,10,20,50],
      pageLength: 5,
      // processing: true
    };
    this.getAllGrave()
    // this.graveService.listUpdated()
    //   .subscribe((updated: boolean) => {
    //   if (updated) {
    //     this.getAllGrave();
    //   }
    // });
  }
  
  getAllGrave(){
    this.subscriber = {
      next: (data: any) => {
        this.graves = data;
        console.log(data);
        this.dtTrigger.next();
      },
      error: console.error,
      complete: () => {},
    };

    this.graveService.getAllGraves().pipe().subscribe(this.subscriber)
  }

  onDeleteGrave(id: string): void {
    this.subscriber = {
      next: (graves: Grave[]) => {
        console.log('grave deleted');
        this.graves = graves;        
      },
      error: console.error,
      complete: () => {

      },
    };

    this.graveService.deleteGrave(id)
      .pipe(
        switchMap(() => this.graveService.getAllGraves())
      )
      .subscribe(this.subscriber);
  }

}
