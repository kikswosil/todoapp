import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterDTO } from '../user/user-register-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: UserRegisterDTO = {
    username: '', 
    email: '', 
    password: '', 
    passwordConfirmation: ''
  };
}
