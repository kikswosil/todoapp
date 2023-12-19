import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterDTO } from '../user/user-register-dto';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(Router) private router: Router
  ) {}

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
    // add handing invalid form.
    if(!this.checkPasswordValidity() && !this.checkEmailValidity()) return;
    this.userService.createUser(this.cleanUser(), (user, error) => {
      if(error) return console.error(error);
      this.router.navigate(['/']);
    });
  }
}
