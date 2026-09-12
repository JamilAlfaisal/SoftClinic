import { Component } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-patients',
  imports: [Sidebar],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {}
