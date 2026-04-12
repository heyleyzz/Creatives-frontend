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

  firstName = '';
  lastName = '';
  email = '';
  bio = '';

  name = '';
  role = '';

  imagePreview: string | null = null;

  activeTab = 'profile';
  showSuccess = false;

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || 'Your Name';
    this.role = localStorage.getItem('role') || 'Your Role';

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage && savedImage.startsWith('data:image')) {
      this.imagePreview = savedImage;
    }
  }

  // ✅ FORMAT ROLE
  formatRole(role: string): string {
    if (!role) return '';

    return role
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;

        localStorage.setItem('profileImage', this.imagePreview);

        // 🔥 UPDATE SIDEBAR
        window.dispatchEvent(new Event('profileUpdated'));
      };

      reader.readAsDataURL(file);
    }
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  saveProfile(): void {
    this.showSuccess = true;

    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }
}