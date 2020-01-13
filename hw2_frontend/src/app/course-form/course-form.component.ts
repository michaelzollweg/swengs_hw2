import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../services/type.service';
import {UniversityService} from '../services/university.service';
import {ProfessorService} from '../services/professor.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseFormGroup;
  universityOptions;
  professorOptions;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public typeService: TypeService,
              private universityService: UniversityService, private professorService: ProfessorService, private router: Router) {
  }

  ngOnInit() {
 //   const id = this.route.snapshot.paramMap.get('id');
    this.courseFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: [null],
      university: [null],
      professor: [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/course/' + id + '/get')
        .subscribe((response) => {
          this.courseFormGroup.patchValue(response);
        });
    }

    const data = this.route.snapshot.data;
    if (data.course) {
      this.courseFormGroup.patchValue(data.course);
    }
    this.universityOptions = data.universityOptions;
    this.professorOptions = data.professorOptions;


    this.universityService.retrieveUniversityOptions().subscribe((result) => {
      this.universityOptions = result;
    });

    this.professorService.retrieveProfessorOptions().subscribe((result) => {
      this.professorOptions = result;
    });
  }


  createCourse() {
    const course = this.courseFormGroup.value;
    if (course.id) {
      this.http.put('/api/course/' + course.id + '/update', course)
        .subscribe(() => {
          this.router.navigate(['course-list']);
        });
    } else {
      this.http.post('/api/course/create', course)
        .subscribe(() => {
         this.router.navigate(['course-list']);
        });
    }
  }


}







