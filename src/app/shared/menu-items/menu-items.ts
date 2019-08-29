import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'starter',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'product',
    name: 'Products',
    type: 'link',
    icon: 'description'
  },
  {
    state: 'category',
    name: 'Categories',
    type: 'link',
    icon: 'description'
  },
  {
    state: 'supplier',
    name: 'Suppliers',
    type: 'link',
    icon: 'description'
  },
  {
    state: 'usermanagement',
    name: 'User Management',
    type: 'link',
    icon: 'account_circle'
  },
  // {
  //   state: 'material',
  //   name: 'Material Ui',
  //   type: 'sub',
  //   icon: 'bubble_chart',
  //   badge: [{ type: 'red', value: '17' }],
  //   children: [
  //     { state: 'button', name: 'Buttons' },
  //     { state: 'cards', name: 'Cards' },
  //     { state: 'grid', name: 'Grid List' },
  //     { state: 'lists', name: 'Lists' },
  //     { state: 'menu', name: 'Menu' },
  //     { state: 'tabs', name: 'Tabs' },
  //     { state: 'stepper', name: 'Stepper' },
  //     { state: 'expansion', name: 'Expansion Panel' },
  //     { state: 'chips', name: 'Chips' },
  //     { state: 'toolbar', name: 'Toolbar' },
  //     { state: 'progress-snipper', name: 'Progress snipper' },
  //     { state: 'progress', name: 'Progress Bar' },
  //     { state: 'dialog', name: 'Dialog' },
  //     { state: 'tooltip', name: 'Tooltip' },
  //     { state: 'snackbar', name: 'Snackbar' },
  //     { state: 'slider', name: 'Slider' },
  //     { state: 'slide-toggle', name: 'Slide Toggle' }
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
