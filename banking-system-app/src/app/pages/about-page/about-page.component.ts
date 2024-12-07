import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from "../../components/auth-header/auth-header.component";

@Component({
  selector: 'app-about-page',
  imports: [RouterOutlet, AuthHeaderComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
