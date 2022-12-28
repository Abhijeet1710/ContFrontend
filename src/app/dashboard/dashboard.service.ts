import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendRoot } from "../backendUrl";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = "https://contbackend.onrender.com";

  constructor(private http : HttpClient) { }

  updateUserData = (userData) : Observable<any> => {
    return this.http.post(`${backendRoot}/user/update`, userData);
  }

  getAllProjects = () : Observable<any> => {
    return this.http.get(`${backendRoot}/projects`);
  }

  getUser = (userId) : Observable<any> => {
    return this.http.get(`${backendRoot}/user/${userId}`);
  }
}
