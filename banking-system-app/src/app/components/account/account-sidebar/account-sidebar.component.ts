import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-sidebar',
  imports: [RouterLink],
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css'
})
export class AccountSidebarComponent {

  hasRoute(): any {
    // return this.router.url === '/customer/open-bank-account';
    }
}
