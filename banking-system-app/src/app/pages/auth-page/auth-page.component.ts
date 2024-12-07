import { Component } from '@angular/core';
import { AuthHeaderComponent } from "../../components/auth-header/auth-header.component";
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [AuthHeaderComponent, RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {


}
