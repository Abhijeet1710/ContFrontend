import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  editing: boolean = false;
  userData: any;
  savingUnderProgress = false;

  myPopularProjects:any;
  participatedPopularProjects:any;

  myProjects:any;
  participatedProjects:any;

  all: any;
  user:any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private dashboardService: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    
    if (!this.user) {
      router.navigate(['SignIn'])
    }else {
      // this.userData = { ...user };
    }
  }

  ngOnInit(): void {
    let mp = [];
    let mpp = [];
    let pp = [];
    let ppp = [];

    this.dashboardService.getUser(this.user.userId).subscribe(
      (res) => {
        console.log(res);
        
        this.userData = res.data[0];
      },
      (err) => {
        console.log(err);
        
      }
    )

    this.dashboardService.getAllProjects().subscribe(
      (res: any) => {
        this.all = res.data;

        for(let ind=0; ind<this.all.length; ind++) {
          if(this.all[ind].projectAdmin == this.userData.userId) mp.push(this.all[ind]);
          if(mpp.length < 4 && this.all[ind].projectAdmin == this.userData.userId) mpp.push(this.all[ind]);
        }

        this.myPopularProjects = mpp;
        this.myProjects = mp;
    
        for(let ind=0; ind<this.all.length; ind++) {
          for(let j of this.all[ind].projectContributors) {
            if(j == this.userData.userId) {
              pp.push(this.all[ind]);
              if(ppp.length < 4) ppp.push(this.all[ind]);
              break;
            } 
          }
        }

        this.participatedPopularProjects = ppp;
        this.participatedProjects = pp;

        console.log(this.myProjects);
        console.log(this.myPopularProjects);
        console.log(this.participatedProjects);
        console.log(this.participatedPopularProjects);
        
      },
      (err) => {

      }
    )

  }

  loadUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    this.userData = { ...user };
  }

  updateUserData() {
    this.savingUnderProgress = true
    this.dashboardService.updateUserData(this.userData)
      .subscribe((data: any) => {
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data.data));
        this.savingUnderProgress = false;;
        this.loadUser();
        this._snackBar.open(`😊 Updated Succesfully`, '', { duration: 2000 });
        this.closeEditProfile();
      }, (err) => {
        console.log(err.error.message);

      })
  }

  closeEditProfile() {
    this.editing = false;
  }

  openEditProfile() {
    this.editing = true;
  }

}


  // allProjects =  [
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin", "Java", "Android", "Kotlin", "Java", "Android", "Kotlin", "Java", "Android"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["C++", "Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   },
  //   {
  //     name: "Github API",
  //     description: "📒 GitHub Profile is a complete 💎Kotlin-Android 📱 application built to demonstrate the use of Modern development tools with best practices implementation",
  //     tech: ["Kotlin"],
  //     likes: 20
  //   }

  // ];