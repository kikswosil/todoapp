import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      dropdown works!
    </p>
  `,
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

}
