import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CreateNewService {

  url = "https://contbackend.onrender.com";

  constructor(private http : HttpClient) { }

  // C
  addNewProject = (projectData) : Observable<any> => {
    return this.http.post(`${this.url}/project/addNewProject`, projectData);
  }
}
