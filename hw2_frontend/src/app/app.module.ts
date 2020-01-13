import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseListComponent } from './course-list/course-list.component';
import {
  _MatMenuDirectivesModule, MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldControl,
  MatFormFieldModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { DateComponent } from './date/date.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityFormComponent } from './university-form/university-form.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    LoginComponent,
    LogoutComponent,
    CourseFormComponent,
    DateComponent,
    UniversityListComponent,
    UniversityFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
