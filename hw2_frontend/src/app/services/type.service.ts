import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }

  typeNames = {
    le: 'Lecture',
    ex: 'Exercise',
    xx: 'Exam',
  };

}
