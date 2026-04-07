import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MyTasksComponent } from './pages/Mytask/MyTask.component';
import { ProductionTaskComponent } from './pages/production-task/production-task.component';
import { SubmitWorkComponent } from './pages/submit-work/submit-work.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';

export const routes: Routes = [

  // 🔥 FIRST PAGE = LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: MyTasksComponent },
      { path: 'my-tasks', component: MyTasksComponent }, // optional alias
      { path: 'production', component: ProductionTaskComponent },
      { path: 'submit', component: SubmitWorkComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'assignments', component: AssignmentsComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }

];