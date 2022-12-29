import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendRoot } from "../backendUrl";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  url = backendRoot;

  constructor(private http : HttpClient) { }

  getUser = (userName) : Observable<any> => {
    return this.http.get(`${this.url}/user/viaUserName/${userName}`);
  }
}
