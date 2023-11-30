import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  constructor(@Inject(UserService) private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    const {response, error} = await this.userService.getUserProfile();
    console.log(response);
  }
}
