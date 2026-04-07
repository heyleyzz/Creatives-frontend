import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name: string = '';
  role: string = '';

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || 'User';
    this.role = localStorage.getItem('role') || 'Member';
  }

}