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
  sendingRequestInprogres = false;
  acceptingRequestInprogres = false;

  contributors: any = [];
  likedBy: any = [];
  requests: any = [];

  isAdmin = false;
  isContributor = false;
  isUser = true;

  alreadyLiked = false;
  LikeCount = 0;

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
            console.log(res.data);
            this.likedBy = res.data;
            this.LikeCount = this.likedBy.length;
            
            for (let i = 0; i < this.likedBy.length; i++) {
              if(this.likedBy[i].userId == this.userData.userId) {
                this.alreadyLiked = true;
              }
            }
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
    if(this.sendingRequestInprogres) return;
    this.sendingRequestInprogres = true;

    this.projectService.sendRequest(this.projectData.projectId, this.userData.userId).subscribe(
      (res) => {
        console.log(res);
        this.sendingRequestInprogres = false;
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.sendingRequestInprogres = false;
      }
    )
  }

  acceptRequest(user) {
    this.acceptingRequestInprogres = true;
    this.projectService.acceptRequest(this.projectData.projectId, user.userId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
        this.acceptingRequestInprogres = false;
      },
      (err) => {
        console.log(err);
        this.acceptingRequestInprogres = false;
      }
    )
  }

  toggelLike() {
    if(this.alreadyLiked) {
      this.alreadyLiked = false;
      this.LikeCount -= 1;
      
      this.projectService.unlikeProject(this.projectData.projectId, this.userData.userId).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      )

    }else {
      this.alreadyLiked = true;
      this.LikeCount += 1;

      this.projectService.likeProject(this.projectId, this.userData.userId).subscribe(
        (data) => {
          console.log("Like "+JSON.stringify(data));
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
          
        }
      );
    }

    
  }
}
