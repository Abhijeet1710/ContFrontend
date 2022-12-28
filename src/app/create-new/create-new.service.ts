import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs"
import { backendRoot } from "../backendUrl";

@Injectable({
  providedIn: 'root'
})
export class CreateNewService {

  constructor(private http : HttpClient) { }

  // C
  addNewProject = (projectData) : Observable<any> => {
    return this.http.post(`${backendRoot}/project/addNewProject`, projectData);
  }
}
