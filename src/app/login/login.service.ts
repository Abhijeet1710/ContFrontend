import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendRoot } from "../backendUrl";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = backendRoot;

  constructor(private http : HttpClient) {   
  }

  loginUser(data: any) : Observable<any> {
    console.log(`${backendRoot}/user/login`);
    
    return this.http.post(`${backendRoot}/user/login`, data);
  }

  signUpUser(data: any) : Observable<any> {
    return this.http.post(`${backendRoot}/user/register`, data);
  }
}
