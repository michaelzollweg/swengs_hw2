import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  retrieveUniversityOptions() {
    return this.http.get <any[]>('/api/university/options');
  }

  getUniversities() {
    return this.http.get('/api/university/list');
  }
}







