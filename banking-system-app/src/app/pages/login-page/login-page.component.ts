import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,NgIf,RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
 
  constructor(private authService:AuthService,private router:Router,private actRoute:ActivatedRoute){
    this.actRoute.queryParams.subscribe(p=>{
      this.msg = p['msg'];
    })
   }

  username:string="";
  password:string ="";
  msg:string |undefined;
  errorMsg:string|undefined;
  successMsg:string|undefined;

  onLogin(){
    this.authService.login({
      username:this.username,
      password:this.password
    }).subscribe({
      next:(data)=>{
        let token = data.token;
        // * use this token, call the api that gives you the full details of this loggedIn user 
        this.authService.getUserDetails(token).subscribe({
          next:(data)=>{
            localStorage.setItem('token',token);
            localStorage.setItem('username',data.username);
            localStorage.setItem('name',data.name);
            let role = data.role;
            switch(role){
              case 'CUSTOMER':
                 //console.log('i willl take you to customer screen');
                 this.router.navigateByUrl("/customer");
                 break; 
              default: 
                 this.router.navigateByUrl("/broken-link");
                 break; 

            }
             
          },
          error:(err)=>{
            
            this.errorMsg = err.error; 
            console.log(this.errorMsg);
            
            this.successMsg = undefined
            this.msg = undefined
           
          }

        })
      },
      error:(err)=>{
        this.errorMsg = err.error;
        // console.log(err.error);
        
        // console.log(this.errorMsg);
        
        this.successMsg = undefined
        this.msg = undefined
      
      }
    })

  }


}
