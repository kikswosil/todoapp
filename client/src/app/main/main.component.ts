import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Todo } from '../todo/todo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  username: string | undefined = '';

  // make this fetch from the server.
  todos: Todo[] = [
    {
      title: 'go shopping',
      details: 'buy new trowsers',
      isDone: false
    },
    {
      title: 'do the laundry',
      details: '',
      isDone: false
    },
    {
      title: 'do something silly',
      details: 'do somthing very important',
      isDone: true
    }
  ];

  constructor(@Inject(UserService) private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    // for development purposes disabled this line. uncomment it later.
    // if(!this.userService.isAuthenticated()) this.router.navigate(['']);
    const {response, error} = await this.userService.getUserProfile();
    this.username = response?.username;
  }
}
