import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  userData: any;
  aboutMe: [];
  editingAboutMe = false;
  updatingAboutMeInprogres = false;

  @Input() myPopularProjects;   
  @Input() participatedPopularProjects;    

  constructor(private router: Router, private _snackBar: MatSnackBar, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadUser();

    console.log(this.myPopularProjects);
    console.log(this.participatedPopularProjects);
  }

  updateAboutMe() {
    this.updatingAboutMeInprogres = true;

    this.dashboardService.updateUserData(this.userData)
      .subscribe((data: any) => {
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data.data));

        this.updatingAboutMeInprogres = false;
        this.loadUser();
        this._snackBar.open(`😊 Updated Succesfully`, '', { duration: 2000 });
        this.editingAboutMe = false;
      }, (err) => {
        console.log(err.error.message);
        this._snackBar.open(`🤔 Some Internal Error`, '', { duration: 2000 });
      })
  }

  loadUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    this.userData = { ...user };
    this.aboutMe = this.userData.aboutMe.split(",");

    console.log(this.aboutMe);

  }

  openProject(projectToOpen) {
    console.log(projectToOpen);
    this.router.navigate(['dashboard/project/'+projectToOpen.projectId]);
  }
  

}
