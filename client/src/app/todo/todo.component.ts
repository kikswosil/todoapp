import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.interface';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { Option } from '../dropdown/option.interface';

@Component({
    selector: 'app-todo',
    standalone: true,
    template: `
    <div class="todo">
      <div>
        <h1>{{ todo.isDone ? '✅' : '❌' }} {{ todo.title }}</h1>
        <div>{{ todo.details }}</div>
      </div>
      <!-- could extract this into a separate component. -->
      <app-dropdown [options]="options"></app-dropdown>
    </div>
  `,
    styleUrl: './todo.component.css',
    imports: [CommonModule, DropdownComponent]
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;

  options: Option[] = [
    {
      text: 'mark as done',
      callback: () => {console.log('done')}
    },
    {
      text: 'edit',
      callback: () => {console.log('edit')}
    }
  ];
}
