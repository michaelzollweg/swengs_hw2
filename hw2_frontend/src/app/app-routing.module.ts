import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from './course-list/course-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {CourseFormComponent} from './course-form/course-form.component';
import {UniversityListComponent} from './university-list/university-list.component';
import {UniversityFormComponent} from './university-form/university-form.component';
import {ProfessorOptionsResolver} from './resolver/professor-options-resolver.service';
import {UniversityOptionsResolver} from './resolver/university-options-resolver.service';
import {CourseResolver} from './resolver/course-resolver.service';


const routes: Routes = [
  { path: 'course-list', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'university-list', component: UniversityListComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'course-form', component: CourseFormComponent, canActivate: [AuthGuard],
    resolve: {
      universityOptions: UniversityOptionsResolver,
      professorOptions: ProfessorOptionsResolver,
    }},
  {path: 'course-form/:id', component: CourseFormComponent, canActivate: [AuthGuard],
    resolve: {
      universityOptions: UniversityOptionsResolver,
      professorOptions: ProfessorOptionsResolver,
      course: CourseResolver,
    }},
  {path: 'university-form', component: UniversityFormComponent, canActivate: [AuthGuard],
    resolve: {
      universityOptions: UniversityOptionsResolver,
      professorOptions: ProfessorOptionsResolver,
    }},
  {path: 'university-form/:id', component: UniversityFormComponent, canActivate: [AuthGuard],
    resolve: {
      universityOptions: UniversityOptionsResolver,
      professorOptions: ProfessorOptionsResolver,
    }},
  {path: '', redirectTo: 'course-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
