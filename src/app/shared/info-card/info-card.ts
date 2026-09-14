import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard {

  title = input.required<string>();
}
