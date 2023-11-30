import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserLoginDTO } from '../user/user-login-dto';
import { UserService } from '../user/user.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  model = new UserLoginDTO('', '');
  errorMessage: string = '';

  constructor(
    @Inject(UserService) private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
      if(this.userService.isAuthenticated()) this.router.navigate(['/app']);
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (!form.valid) {
      this.errorMessage =
        'Cannot submit: One or more of required fields are empty.';
      return;
    }

    const {success, errorMessage} = await this.userService.authenticate(this.model);
    if(!success) this.errorMessage = errorMessage;
    else {
      this.router.navigate(['/app']);
    }
  }
}
