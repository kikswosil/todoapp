import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo">
      <div>
        <h1>{{ todo.isDone ? '✅' : '❌' }} {{ todo.title }}</h1>
        <div>{{ todo.details }}</div>
      </div>
      <div class="buttons">
        <button class="list-button" (click)="toggleListOpen()">...</button>
        <ul class="list" *ngIf="isListOpen">
          <li (click)="markAsDone()">mark as done</li>
          <li (click)="edit()">edit</li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  
  @Input({ required: true }) todo!: Todo;

  isListOpen: boolean = false;

  public ngAfterViewInit(): void {}

  public toggleListOpen() {
    this.isListOpen = !this.isListOpen;
  }

  public markAsDone() {
    console.log('done')
  }

  public edit() {
    console.log('edit')
  }
}
