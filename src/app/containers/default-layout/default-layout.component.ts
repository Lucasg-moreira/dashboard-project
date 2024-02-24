import { Component } from '@angular/core';

import { navItems } from './_nav';

import { isUserAdmin } from 'src/app/utils'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  private adminOnlyItems = ['empresas/criar']
  private isAdmin = isUserAdmin()

  public navItems = navItems.filter(el => {
    return this.isAdmin ? el : !this.adminOnlyItems.includes(el.url as string)
  });
  
  constructor() {}
}
