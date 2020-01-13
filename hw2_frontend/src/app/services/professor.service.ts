import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  retrieveProfessorOptions() {
    return this.http.get <any[]>('/api/professor/options');
  }
}

