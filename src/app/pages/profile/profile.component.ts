import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SettingsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // 🔥 FORM DATA
  firstName = '';
  lastName = '';
  email = '';
  bio = '';

  // 🔥 LOGIN DATA (FROM LOCAL STORAGE)
  name: string = '';
  role: string = '';

  // UI
  imagePreview: string | null = null;
  activeTab: string = 'profile';
  showSuccess = false;

  // ✅ LOAD NAME + ROLE
  ngOnInit() {
    this.name = localStorage.getItem('name') || 'Your Name';
    this.role = localStorage.getItem('role') || 'Your Role';
  }

  // IMAGE PREVIEW
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // LOGOUT
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  // SAVE PROFILE
  saveProfile() {
    this.showSuccess = true;

    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }
}