import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  username: string | undefined = '';
  constructor(@Inject(UserService) private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    if(!this.userService.isAuthenticated()) this.router.navigate(['']);
    const {response, error} = await this.userService.getUserProfile();
    this.username = response?.username;
  }
}
