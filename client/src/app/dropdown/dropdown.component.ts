import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Option } from './option.interface';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="buttons">
      <button class="list-button" (click)="toggleListOpen($event)">...</button>
      <ul class="list" *ngIf="isListOpen">
        <li *ngFor="let option of options" (click)="noPropagationClick($event, option.callback)">{{option.text}}</li>
      </ul>
    </div>
  `,
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  public isListOpen: boolean = false;

  @Input({ required: true }) public options!: Option[];

  @HostListener('window:click')
  public closeList() {
    this.isListOpen = false;
  }

  public toggleListOpen(event: Event) {
    event.stopPropagation();
    this.isListOpen = !this.isListOpen;
  }

  public noPropagationClick(event: Event, callback: Function) {
    event.stopPropagation();
    callback();
  }
}
