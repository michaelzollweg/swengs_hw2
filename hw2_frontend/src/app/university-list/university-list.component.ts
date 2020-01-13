import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeService} from '../services/type.service';
import {UserService} from '../services/user.service';
import {UniversityService} from '../services/university.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {

  universities: any[];

  displayedColumns = ['name', 'location', 'id'];

  constructor(private http: HttpClient, private universityService: UniversityService,
              public typeService: TypeService, public userService: UserService) { }

  ngOnInit() {
    this.universityService.getUniversities()
      .subscribe((response: any[]) => {
        this.universities = response;
      });
    this.http.get('/api/university/list')
      .subscribe((response: any[]) => {
        this.universities = response;
      });
  }

  deleteUniversity(university: any) {
    this.http.delete('/api/university/' + university.id + '/delete')
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}




