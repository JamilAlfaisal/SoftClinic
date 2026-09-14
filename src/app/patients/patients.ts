import { Component, inject } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Patient, PatientsService } from './patients.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [Sidebar, RouterLink],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {

  pateintsService = inject(PatientsService)
  patients:Patient[] = this.pateintsService.patients()
  
}
