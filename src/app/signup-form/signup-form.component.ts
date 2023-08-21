import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent
{
  errorMsg:string='';
  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void
  {
    
  }

  onSignup(formData:NgForm)
  {
    if(formData.invalid)
    {
      return;
    }
    this.userService.signupUser(formData.value.userName, formData.value.userEmail, formData.value.userPassword).subscribe({
      next:(apiData)=>
      {
        console.log(apiData);
        this.router.navigate(['/Log-in'])
      },
      error:()=>
      {
        console.log('Error Creating User!');
        this.errorMsg='Email Already Exists!';
      }
    })
  }
}
