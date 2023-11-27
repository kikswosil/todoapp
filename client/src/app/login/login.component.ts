import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  model = new User(0, "", "");

  onSubmit() {
    console.log(this.model);
  }
}
