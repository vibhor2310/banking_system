import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-account-navbar',
  imports: [],
  templateUrl: './account-navbar.component.html',
  styleUrl: './account-navbar.component.css'
})
export class AccountNavbarComponent {

  name:any;
  // // accountId:any;
  // accounts:[]=[];
  aid:any;

  constructor(private router:Router,private customerService:CustomerService ,private actRoute:ActivatedRoute) {  // injecting router;
    this.name = localStorage.getItem('username');
    this.actRoute.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
    
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

    navigateToAccountDashboard() {
     
        // console.log(this.aid);
        this.router.navigate(["/account",this.aid]);
        
}
}
