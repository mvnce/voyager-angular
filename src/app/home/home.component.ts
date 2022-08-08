/**
 * Created by Vincent Ma on 8/16/16.
 */

import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [
    trigger('routeAnimation', [
      state('*', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(5%)'
        }),
        animate('0.5s 0.1s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(5%)'
        }))
      ])
    ])
  ]
})
export class HomeComponent {
  public _currentYear: number = new Date().getFullYear();

  @HostBinding('@routeAnimation')
  get routeAnimation(): boolean {
    return true;
  }

  @HostBinding('style.display')
  get display(): string {
    return 'block';
  }

  @HostBinding('style.position')
  get position(): string {
    return 'absolute';
  }
}
