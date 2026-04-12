import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name: string = '';
  role: string = '';
  profileImage: string | null = null;

  ngOnInit(): void {
    this.loadUser();

    // ✅ REAL-TIME UPDATE
    window.addEventListener('profileUpdated', () => {
      this.loadUser();
    });
  }

  loadUser() {
    this.name = localStorage.getItem('name') || 'User';
    this.role = localStorage.getItem('role') || 'Member';

    const img = localStorage.getItem('profileImage');

    this.profileImage =
      img && img.startsWith('data:image') ? img : null;
  }

  // ✅ FORMAT ROLE (🔥 FIX)
  formatRole(role: string): string {
    if (!role) return '';

    return role
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}