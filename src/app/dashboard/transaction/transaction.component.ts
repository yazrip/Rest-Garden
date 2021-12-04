import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
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
  subscriber?: Observer<any>;
  
  constructor(private readonly transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAll()
    this.transactionService.listUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    });
  }

  getAll(){
    this.subscriber = {
      next: (data: any) => {this.transactions = data, console.log(data)},
      error: console.error,
      complete: () => {},
    };

    this.transactionService.getAll().pipe(delay(500)).subscribe(this.subscriber)
  }
}
