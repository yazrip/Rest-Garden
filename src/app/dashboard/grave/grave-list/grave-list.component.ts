import { Component, Input, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
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

  constructor(private readonly graveService: GraveService) { }

  ngOnInit(): void {
    this.getAll()
    this.graveService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    });
  }
  
  getAll(){
    this.subscriber = {
      next: (data: any) => {this.graves = data, console.log(data)},
      error: console.error,
      complete: () => {},
    };

    this.graveService.getAllGraves().pipe(delay(500)).subscribe(this.subscriber)
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
        delay(1500),
        switchMap(() => this.graveService.getAllGraves())
      )
      .subscribe(this.subscriber);
  }

}
