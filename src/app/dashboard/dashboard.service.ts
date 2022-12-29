import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendRoot } from "../backendUrl";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = backendRoot;

  constructor(private http : HttpClient) { }

  updateUserData = (userData) : Observable<any> => {
    return this.http.post(`${this.url}/user/update`, userData);
  }

  getAllProjects = () : Observable<any> => {
    return this.http.get(`${this.url}/projects`);
  }

  getUser = (userId) : Observable<any> => {
    return this.http.get(`${this.url}/user/${userId}`);
  }
}
