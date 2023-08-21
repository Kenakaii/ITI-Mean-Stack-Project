import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent
{
  errorMsg:string='';

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit(): void
  {

  }

  onLogin(formData:NgForm)
  {
    if(formData.invalid)
    {
      return;
    }
    this.userService.loginUser(formData.value.userEmail, formData.value.userPassword).subscribe({
      next:(apiData)=>
      {
        console.log(apiData);
        this.router.navigate(['/Movies']);
      },
      error:(error)=>
      {
        console.log(error);
        this.errorMsg=error.error.message;
      }
    })
  }
}
