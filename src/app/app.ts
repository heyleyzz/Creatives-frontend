import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ FIX
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent], // ✅ FIX
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url.includes('/login'); // ✅ safer
  }

}