import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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
      <!-- could extract this into a separate component. -->
      <div class="buttons">
        <button class="list-button" (click)="toggleListOpen($event)">...</button>
        <ul class="list" *ngIf="isListOpen">
          <li (click)="markAsDone($event)">mark as done</li>
          <li (click)="edit($event)">edit</li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  
  @Input({ required: true }) todo!: Todo;

  isListOpen: boolean = false;

  @HostListener('window:click') 
  closeList() {
    this.isListOpen = false;
  }

  public toggleListOpen(event: Event) {
    event?.stopPropagation();
    this.isListOpen = !this.isListOpen;
  }

  public markAsDone(evnet: Event) {
    console.log('done')
  }

  public edit(event: Event) {
    console.log('edit')
  }
}
