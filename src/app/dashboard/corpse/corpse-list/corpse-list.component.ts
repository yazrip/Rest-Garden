import { Component, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { Corpses } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';

@Component({
  selector: 'app-corpse-list',
  templateUrl: './corpse-list.component.html',
  styleUrls: ['./corpse-list.component.scss']
})
export class CorpseListComponent implements OnInit {

  corpses: Corpses[] = [];
  subscriber?: Observer<any>

  constructor(private readonly corpseService: CorpseService) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  ngOnInit(): void {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 50],
      processing: true
    }
    this.getAllCorpse()
    this.corpseService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAllCorpse();
      }
    });
  }
  getAllCorpse() {
    this.subscriber = {
      next: (data: any) => {
        this.corpses = data; 
        console.log(data);
        this.dtTrigger.next();
      },
      error: console.error,
      complete: () => {},
    }

    this.corpseService.getAllCorpse().pipe().subscribe(this.subscriber)
  }

}
