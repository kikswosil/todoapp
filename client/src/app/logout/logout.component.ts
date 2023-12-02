import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      logout works!
    </p>
  `,
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  constructor(@Inject(UserService) private userService: UserService, @Inject(Router) private router: Router){}

  ngOnInit(): void {
    
  }
}
