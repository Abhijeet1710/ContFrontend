import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateNewService } from './create-new.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {

  userData : any;
  projectData = {
    projectName: '',
    projectAdmin: 1,
    projectDescription: '',
    teamMatesRequire: 1,
    techStackRequire: [],
    projectDomain: [],
    projectContributors: [],
    liked: []
  };
  techStackRequire:string = '';
  projectDomain:string = '';

  constructor(private router : Router, private createNewService : CreateNewService) { 
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      router.navigate(['SignIn']);
    }
    this.userData = user;    
  }

  ngOnInit(): void {
  }

  addProject () {
    this.projectData.techStackRequire = this.techStackRequire.split(",");
    this.projectData.projectDomain = this.projectDomain.split(",");
    this.projectData.projectAdmin = this.userData.userId;
    this.projectData.projectContributors.push(this.userData.userId);

    console.log(this.projectData);

    if(this.projectData.projectName.length == 0 || 
      this.projectData.projectDescription.length == 0 || 
      this.projectData.techStackRequire.length == 0 || 
      this.projectData.projectDomain.length == 0 ||
      this.projectData.teamMatesRequire == 0) {
        alert("Fill all fields");
        return;
      }

      this.createNewService.addNewProject(this.projectData).subscribe(
        (res) => {
            console.log(res);
            this.router.navigate(['dashboard']);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  cancel = () => {
    this.router.navigate(['dashboard']);
  }

}
