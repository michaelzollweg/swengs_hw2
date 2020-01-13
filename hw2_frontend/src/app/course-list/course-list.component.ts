import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../services/course.service';
import {TypeService} from '../services/type.service';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: any[];

  displayedColumns = ['name', 'type',
    'university_name'
    , 'id'];

  constructor(private http: HttpClient, private courseService: CourseService,
              public typeService: TypeService, public userService: UserService) { }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe((response: any[]) => {
        this.courses = response;
      });
    this.http.get('/api/course/list')
      .subscribe((response: any[]) => {
        this.courses = response;
      });
  }

  deleteCourse(course: any) {
    this.http.delete('/api/course/' + course.id + '/delete')
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}


