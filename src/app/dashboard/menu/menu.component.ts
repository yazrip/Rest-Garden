import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private readonly router:Router) { }
  storage: Storage = sessionStorage;

  ngOnInit(): void {
    
  }

  ngOnSignOut(): void {
    this.storage.removeItem('token')
    this.storage.removeItem('username')
    this.router.navigateByUrl('/')
  }

}
