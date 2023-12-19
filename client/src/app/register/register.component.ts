import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterDTO } from '../user/user-register-dto';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  onSubmit(form: NgForm) {
    console.log(this.user);
  }
}
