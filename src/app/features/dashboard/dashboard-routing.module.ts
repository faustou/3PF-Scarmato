import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './courses/components/classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  // Ya sabemos que el path actual es /dashboard
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    // component: HomeComponent,
  },
  {
    // /dashboard/courses
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: '**', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
    redirectTo: '/dashboard/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}