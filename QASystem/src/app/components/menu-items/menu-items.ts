import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/user';
import { INavItem } from '../sidebar/menu-list-item/nav-item';

const MENUITEMS: INavItem[] = [
  {
    displayName: 'Settings',
    iconName: 'settings',
    route: '/pages/nomenclators',
    role: [Role.Admin,Role.QA]
  },
 {
  displayName: 'Pre-operational',
  iconName: 'settings_input_component',
  route: '/pages/pre-operational',
  role: [Role.Admin, Role.QA]
},
{
  displayName: 'Simple request form',
  iconName: 'description',
  route: '/pages/simple-request-form',
  role: [Role.Admin, Role.QA]
},
{
  displayName: 'Daily checks',
  iconName: 'event',
  route: '/pages/daily-checks',
  role: [Role.Admin, Role.QA]
},
{
  displayName: 'SOP Logs',
  iconName: 'history',
  route: '/pages/sop-logs',
  role: [Role.Admin, Role.QA]
},
{
  displayName: 'CCP',
  iconName: 'vertical_split',
  route: '/pages/ccp',
  role: [Role.Admin, Role.QA]
},
{
  displayName: 'NOZZLE',
  iconName: 'verified_user',
  route: '/pages/nozzle',
  role: [Role.Admin, Role.QA]
},
/*{
  displayName: 'Records',
  iconName: 'layout',
  route: '',
  role: [Role.Admin, Role.QA],
  children: [
    {
    displayName: 'Registro pre-operacion',
    iconName: 'list',
    route: '/pages/pre-operational/logs',
    role: [Role.Admin, Role.QA]
  },
    {
    displayName: 'Registro SOP',
    iconName: 'list',
    route: '/pages/sop-logs/logs',
    role: [Role.Admin, Role.QA]
  },
  ],
}*/
];
@Injectable()
export class MenuItems {
  getMenuitem(): INavItem[] {
    return MENUITEMS;
  }
}
