import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://contbackend.onrender.com";

  constructor(private http : HttpClient) {   
  }

  loginUser(data: any) : Observable<any> {
    return this.http.post(`${this.url}/user/login`, data);
  }

  signUpUser(data: any) : Observable<any> {
    return this.http.post(`${this.url}/user/register`, data);
  }
}
