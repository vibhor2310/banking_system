import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/customer/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/customer/sidebar/sidebar.component";
import { FooterComponent } from "../../components/customer/footer/footer.component";

@Component({
  selector: 'app-customer-page',
  imports: [NavbarComponent, RouterOutlet, SidebarComponent, FooterComponent],
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent {
  
}
