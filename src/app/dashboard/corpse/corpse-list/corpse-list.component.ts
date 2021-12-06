import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Corpse } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';

@Component({
  selector: 'app-corpse-list',
  templateUrl: './corpse-list.component.html',
  styleUrls: ['./corpse-list.component.scss']
})
export class CorpseListComponent implements OnInit {

  corpses: Corpse[] = [];
  subscriber?: Observer<any>

  constructor(private readonly corpseService: CorpseService) { }

  ngOnInit(): void {
    this.getAllCorpse()
    this.corpseService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAllCorpse();
      }
    });
  }
  getAllCorpse() {
    this.subscriber = {
      next: (data: any) => {this.corpses = data, console.log(data)},
      error: console.error,
      complete: () => {},
    }
  }

}
