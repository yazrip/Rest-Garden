import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
