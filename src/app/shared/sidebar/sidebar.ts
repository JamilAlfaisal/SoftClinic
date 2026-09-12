import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host: {
    '[class.isCollapsed]':'!drawerOpen()',
    '[class.isNotCollapsed]':'drawerOpen()'
  }
})
export class Sidebar {

  drawerOpen = signal<boolean>(true);

  toggleDrawer() {
    this.drawerOpen.update((prev) =>{
      return !prev
    })
  }
}
