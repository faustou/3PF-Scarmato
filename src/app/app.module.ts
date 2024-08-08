import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './features/auth/login/login.module';
import { AuthMockService } from './core/services/auth-mock.service';
import { HomeModule } from './features/dashboard/home/home.module';
import { StudentsModule } from './features/dashboard/students/students.module';
import { CoursesModule } from './features/dashboard/courses/courses.module';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    AuthMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
