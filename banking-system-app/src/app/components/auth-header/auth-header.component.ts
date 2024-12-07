import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  imports: [RouterOutlet],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css'
})
export class AuthHeaderComponent {



  constructor(private router:Router) { } // injecting router

  navigateToSignUp(){
    this.router.navigateByUrl("/sign-up");
  }

  navigateToLogin() {
    this.router.navigateByUrl("/login");
    }

  navigateToHome() {
     this.router.navigateByUrl("/");
  }

  navigateToAbout() {
     this.router.navigateByUrl("/about-page")
   }
        

}
