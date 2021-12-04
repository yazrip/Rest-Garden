import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
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
  subscriber?: Observer<any>;
  
  constructor(private readonly reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getAll()
    this.reservationService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    });
  }

  getAll(){
    this.subscriber = {
      next: (data: any) => {this.reservations = data, console.log(data)},
      error: console.error,
      complete: () => {},
    };

    this.reservationService.getAll().pipe(delay(500)).subscribe(this.subscriber)
  }
}
