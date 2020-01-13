import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {UniversityService} from '../services/university.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityOptionsResolver implements Resolve<Observable<any>> {
  constructor(private universityService: UniversityService) {
  }

  resolve() {
    return this.universityService.retrieveUniversityOptions();
  }
}
