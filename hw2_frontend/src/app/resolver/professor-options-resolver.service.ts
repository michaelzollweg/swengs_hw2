import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfessorService} from '../services/professor.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorOptionsResolver implements Resolve<Observable<any>> {
  constructor(private professorService: ProfessorService) {
  }

  resolve() {
    return this.professorService.retrieveProfessorOptions();
  }
}
