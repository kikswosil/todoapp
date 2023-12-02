import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';

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
  constructor(@Inject(UserService) private userService: UserService){}
  ngOnInit(): void {

  }
}
