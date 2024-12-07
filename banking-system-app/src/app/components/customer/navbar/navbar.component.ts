import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  name:any;

  constructor(private router:Router) {  // injecting router;
    this.name = localStorage.getItem('username');
   } 
  

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login?msg=you have successfully logged out')
}

hasRoute(): boolean {
   return this.router.url === '/customer/open-bank-account';
   }


   navigateToCustomerDashboard() {
    this.router.navigateByUrl("/customer");
    }


}
