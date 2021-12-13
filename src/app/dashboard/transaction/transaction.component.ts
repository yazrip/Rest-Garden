import { Component, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from './model/transaction-model';
import { TransactionService } from './service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = []
  transactionsClone: Transaction[] = []
  subscriber?: Observer<any>;
  
  constructor(private readonly transactionService: TransactionService) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 50],
      processing: true
    }
    this.getAll()
    this.transactionService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    });
  }

  getAll(){
    this.subscriber = {
      next: (data: any) => {
        this.transactions = data; 
        console.log(data);
        this.dtTrigger.next();
      },
      error: console.error,
      complete: () => {},
    };

    this.transactionService.getAll().pipe(delay(500)).subscribe(this.subscriber)
  }

  liveSearch(event: any) : void {
    if (event.target.value != '') {
      let search: string = event.target.value.toLowerCase()
      this.transactionsClone = this.transactions.filter(e => e.userName.toLowerCase().includes(search) || e.graveName.toLowerCase().includes(search))
    } else {
      this.transactionsClone = this.transactions
    }
  }
}
