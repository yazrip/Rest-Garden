import { Component, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reservation } from './model/reservation-model';
import { ReservationService } from './service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[] = []
  reservationsClone: Reservation[] = []
  subscriber?: Observer<any>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private readonly reservationService: ReservationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5,10,20,50],
      pageLength: 5,
      // processing: true
    };
    this.getAll()
    this.reservationService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    });
  }

  getAll(){
    this.subscriber = {
      next: (data: any) => {
        this.reservations = data, console.log(data);
        this.reservationsClone = data;
        this.dtTrigger.next();
      },
      error: console.error,
      complete: () => {},
    };

    this.reservationService.getAll().pipe(delay(500)).subscribe(this.subscriber)
  }

  liveSearch(event: any) : void {
    if (event.target.value != '') {
      let search: string = event.target.value.toLowerCase()
      this.reservationsClone = this.reservations.filter(e => e.userName.toLowerCase().includes(search) || e.graveName.toLowerCase().includes(search))
    } else {
      this.reservationsClone = this.reservations
    }
  }
}
