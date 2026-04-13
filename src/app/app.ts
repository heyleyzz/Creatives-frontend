import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ FIX
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent], // ✅ FIX
  templateUrl: './app.html',
  styleUrls: ['./app.css']

  
})
export class AppComponent {

constructor(public auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.loadData()
  }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.loadData(),
      error: () => this.loginError = 'Invalid credentials'
    })
  }

  loadData() {
    this.api.getProfile().subscribe(data => this.profile = data)
    this.api.getItems().subscribe(data => this.items = data.items)
  }

  addItem() {
    this.api.createItem(this.newItem).subscribe({
      next: () => {
        this.items.push(this.newItem)
        this.newItem = ''
      },
      error: (err) => console.error(err)
    })
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/login'); // ✅ safer
  }

}