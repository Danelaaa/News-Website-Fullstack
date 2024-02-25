import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private apiService: ApiService,private message:MessageService,private router:Router) {  }

  ngOnInit(): void {
    
  }

  userLogin(login: NgForm){
    if (login.invalid) {
      return;
    }

    const loginData = {
      email: login.value.email,
      password: login.value.password
    }

    this.apiService.login(loginData.email,loginData.password).subscribe(
      (res)=>{
        if(res.user.roles == 'Admin' && res.success){
          this.message.add({
            severity:'info',
            summary: 'Success',
            detail: 'Authentication Successful',
            life:1500
          });

          setTimeout(()=>{
            this.router.navigateByUrl('/').then();
          },1500)
        }else{
          this.message.add({
            severity:'error',
            summary: 'Failed attempt',
            detail: 'You are not admin',
            life:1500
          });
        }
      },
      (err: HttpErrorResponse) => {
        
          this.message.add({
            severity: "error",
            summary: `Failed ${err.status}`,
            detail: `${err.statusText}`,
            life: 1500
          })
      }
    )
  }

}
