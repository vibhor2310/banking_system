import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/customer/navbar/navbar.component";
import { AccountNavbarComponent } from "../../components/account/account-navbar/account-navbar.component";
import { AccountSidebarComponent } from "../../components/account/account-sidebar/account-sidebar.component";
import { AccountFooterComponent } from "../../components/account/account-footer/account-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-page',
  imports: [AccountNavbarComponent, AccountSidebarComponent, AccountFooterComponent,RouterOutlet],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {

}
