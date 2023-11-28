import { Component } from '@angular/core';
import { Form, FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserLoginDTO } from '../user/user-login-dto';
import { UserService } from '../user/user.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  providers: [UserService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model = new UserLoginDTO('', '');
  errorMessage: string = '';

  constructor(
    @Inject(UserService) private userService: UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage =
        'Cannot submit: One or more of required fields are empty.';
      return;
    }
    this.userService.authenticate(this.model).subscribe({
      next: (response) => {
        this.router.navigate(['/app']);
        this.errorMessage = "";
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.errorMessage =
            'Failed to authenticate: invalid email or password.';
        else if (error.status >= 500) this.errorMessage = 'Server error.';
        else this.errorMessage = 'Unknown error';
      },
    });
  }
}
