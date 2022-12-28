import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendRoot } from "../backendUrl";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = backendRoot;

  constructor(private httpClient : HttpClient) { }

  getProject(projectId) : Observable<any> {
    return this.httpClient.get(`${this.url}/project/${projectId}`);
  }

  getUsersPresentInArray(userIds) : Observable<any> {
    return this.httpClient.post(`${this.url}/users/usersPresentInArray`, {userIds});
  }
  
  sendRequest(projectId, userId) : Observable<any> {
    return this.httpClient.post(`${this.url}/project/addRequest`, {userId, projectId});
  }

  acceptRequest(projectId, userId) : Observable<any> {
    return this.httpClient.post(`${this.url}/project/acceptRequest`, {userId, projectId});
  }

  likeProject(projectId, userId) : Observable<any> {
    return this.httpClient.post(`${this.url}/project/likeProject`, {userId, projectId});
  }

  unlikeProject(projectId, userId) : Observable<any> {
    return this.httpClient.post(`${this.url}/project/unlikeProject`, {userId, projectId});
  }
}
