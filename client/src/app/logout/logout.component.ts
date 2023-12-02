import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      logout works!
    </p>
  `,
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

}
