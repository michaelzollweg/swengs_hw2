import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UniversityService} from '../services/university.service';
import {ProfessorService} from '../services/professor.service';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.component.html',
  styleUrls: ['./university-form.component.scss']
})
export class UniversityFormComponent implements OnInit {

  universityFormGroup;
  professorOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private universityService: UniversityService, private professorService: ProfessorService, private router: Router) { }

  ngOnInit() {
    //   const id = this.route.snapshot.paramMap.get('id');
    this.universityFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required, this.universityNameValidator()]],
      location: [null]
  });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/university/' + id + '/get')
        .subscribe((response) => {
          this.universityFormGroup.patchValue(response);
        });
    }

    const data = this.route.snapshot.data;
    if (data.university) {
      this.universityFormGroup.patchValue(data.university);
    }
    this.professorOptions = data.professorOptions;

    this.professorService.retrieveProfessorOptions().subscribe((result) => {
      this.professorOptions = result;
    });
  }

  universityNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[0-9]/.test(control.value);
      return forbidden ? {'nameError': {value: control.value}} : null;
    };
  }

    createUniversity() {
    const university = this.universityFormGroup.value;
    if (university.id) {
      this.http.put('/api/university/' + university.id + '/update', university)
        .subscribe(() => {
          this.router.navigate(['university-list']);
        });
    } else {
      this.http.post('/api/university/create', university)
        .subscribe(() => {
          this.router.navigate(['university-list']);
        });
    }
}
}





