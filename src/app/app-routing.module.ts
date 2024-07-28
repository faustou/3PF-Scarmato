import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { ClassesComponent } from './features/dashboard/courses/components/classes/classes.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'courses/:id',
        component: ClassesComponent
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      { path: '',
        redirectTo: 'home',
        pathMatch: 'full' 
      }
    ]
  },
  { 
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full' 
  },
  { 
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
