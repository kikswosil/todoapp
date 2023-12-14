import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <div>
        <h1>Could not find page.</h1>
        <p>
          The page you're looking for does not exist (or does not exist yet.)
        </p>
        <a href="/">back to the front page.</a>
      </div>
    </section>
  `,
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
