import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar-new.component.html',
  styleUrls: ['./sidebar-new.component.scss']
})
export class SidebarNewComponent implements OnInit {

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
