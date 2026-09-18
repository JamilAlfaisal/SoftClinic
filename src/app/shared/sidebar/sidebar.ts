import { Component, inject, signal } from '@angular/core';
import { NgClass } from '../../../../node_modules/@angular/common/types/_common_module-chunk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host: {
    '[class.isCollapsed]':'!drawerOpen()',
    '[class.isNotCollapsed]':'drawerOpen()'
  },
  imports: []
})
export class Sidebar {

  
  router = inject(Router)
  drawerOpen = signal<boolean>(true);
  selectedOption = signal<number>(1);

  toggleReminder = signal<boolean>(false)
  toggleUsers = signal<boolean>(false)

  toggleDrawer() {
    this.drawerOpen.update((prev) =>{
      return !prev
    })
  }

  logout(){
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigateByUrl('/login')
  }

}
