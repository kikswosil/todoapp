import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="buttons">
        <button class="list-button" (click)="toggleListOpen($event)">...</button>
        <ul class="list" *ngIf="isListOpen">
        </ul>
    </div>
/p>
  `,
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  public isListOpen: boolean = false;
  public toggleListOpen(event: Event) {
    event.stopPropagation();
    this.isListOpen = !this.isListOpen;
  }
}
