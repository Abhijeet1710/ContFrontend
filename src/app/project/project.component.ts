import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  userData: any;
  projectId: any;
  projectData: any;
  isCurrTeamOpen = false;
  isRequestsOpen = false;
  isLikedByOpen = false;

  contributors: any = [];
  likedBy: any = [];
  requests: any = [];

  isAdmin = false;
  isContributor = false;
  isUser = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
    const user = JSON.parse(localStorage.getItem('user'));

    this.userData = { ...user };

    if (!user) {
      router.navigate(['SignIn'])
    }
  }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('projectId');

    // Get Project
    this.projectService.getProject(this.projectId).subscribe(
      (res) => {
        console.log(res.data[0]);
        this.projectData = res.data[0];
        
        this.isAdmin = this.projectData.projectAdmin == this.userData.userId;
        this.isContributor = this.projectData.projectContributors.includes(this.userData.userId);

        // Get Contributors
        this.projectService.getUsersPresentInArray(this.projectData.projectContributors).subscribe(
          (res) => {
            console.log(res);
            this.contributors = res.data;
          },
          (err) => {
            console.log(err);
          }
        )

        //
        
        // Get Requests Bys
        this.projectService.getUsersPresentInArray(this.projectData.requests).subscribe(
          (res) => {
            console.log(res);
            this.requests = res.data;
          },
          (err) => {
            console.log(err);
          }
        )
        // Get Liked Bys
        this.projectService.getUsersPresentInArray(this.projectData.liked).subscribe(
          (res) => {
            console.log(res);
            this.likedBy = res.data;
          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => {
        console.log(err);
      }
    )
   
  }

  hasSentRequest() {
    return this.projectData.requests.includes(this.userData.userId);
  }

  hasAccesToSendRequest() {
    return (!this.isAdmin && !this.isContributor);
  }

  hasAccesToAcceptRequest() {
    return (this.isAdmin);
  }

  sendRequest() {
    this.projectService.sendRequest(this.projectData.projectId, this.userData.userId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);

      }
    )
  }

  acceptRequest(user) {
    this.projectService.acceptRequest(this.projectData.projectId, user.userId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);

      }
    )
  }
}
