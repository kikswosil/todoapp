import { Component, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Option } from './option.interface';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #list class="buttons">
      <div class="list-button" (click)="toggleListOpen($event)"><img src="../../assets/more-icon.svg"></div>
      <ul class="list" *ngIf="this.dropdownId == this.dropdownService.getOpenList()">
        <li *ngFor="let option of options" (click)="click($event, option.callback)">{{option.text}}</li>
      </ul>
    </div>
  `,
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {

  @ViewChild('list') list!: HTMLDivElement;

  @Input({ required: true }) public options!: Option[];

  @Input({ required: true }) public dropdownId!: string;


  constructor(
    @Inject(DropdownService) protected dropdownService: DropdownService
  ){}

  public toggleListOpen(event: Event) {
    event.stopPropagation();
    if(this.dropdownService.getOpenList() == this.dropdownId) this.dropdownService.setOpenList('');
    else this.dropdownService.setOpenList(this.dropdownId);
  }

  public click(event: Event, option: CallableFunction) {  
    option();
  }

}