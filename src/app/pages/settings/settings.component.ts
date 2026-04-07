import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  email = '';
  password = '';
  confirmPassword = '';

  passwordError = false;

  saveSettings() {
    if (this.password !== this.confirmPassword) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
      alert('Settings saved!');
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
  name: string = '';
role: string = '';

ngOnInit() {
  this.name = localStorage.getItem('name') || 'Your Name';
  this.role = localStorage.getItem('role') || 'Your Role';
}

}