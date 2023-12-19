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

  private checkPasswordValidity() {
    return this.user.password === this.user.passwordConfirmation; 
  }

  private checkEmailValidity() {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.user.email);
  }

  private cleanUser() {
    const {passwordConfirmation, ...user} = this.user;
    return user;
  }

  onSubmit(form: NgForm) {
    console.log(this.cleanUser());
  }
}
