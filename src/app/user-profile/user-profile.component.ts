import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;
  userName: string;

  myPopularProjects: any;
  participatedPopularProjects: any;

  myProjects: any;
  participatedProjects: any;

  all: any;
  aboutMe: [];

  constructor(private ar: ActivatedRoute,private router: Router, private dashboardService: DashboardService, private userProfileService: UserProfileService) {

    this.userName = ar.snapshot.paramMap.get('userName');

  }

  ngOnInit(): void {

    
    let mp = [];
    let mpp = [];
    let pp = [];
    let ppp = [];

    this.userProfileService.getUser(this.userName).subscribe(
      (res) => {
        console.log(res);
        this.userData = res.data[0];
        this.aboutMe = this.userData.aboutMe.split(",");

        console.log(this.aboutMe);


        this.dashboardService.getAllProjects().subscribe(
          (res: any) => {
            this.all = res.data;
    
            for (let ind = 0; ind < this.all.length; ind++) {
              if (this.all[ind].projectAdmin == this.userData.userId) mp.push(this.all[ind]);
              if (mpp.length < 4 && this.all[ind].projectAdmin == this.userData.userId) mpp.push(this.all[ind]);
            }
    
            this.myPopularProjects = mpp;
            this.myProjects = mp;
    
            for (let ind = 0; ind < this.all.length; ind++) {
              for (let j of this.all[ind].projectContributors) {
                if (j == this.userData.userId) {
                  pp.push(this.all[ind]);
                  if (ppp.length < 4) ppp.push(this.all[ind]);
                  break;
                }
              }
            }
    
            this.participatedPopularProjects = ppp;
            this.participatedProjects = pp;
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

  openProject(projectToOpen) {
    console.log(projectToOpen);
    this.router.navigate(['dashboard/project/'+projectToOpen.projectId]);
  }

}
