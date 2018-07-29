/**
 * Created by Vincent Ma on 8/16/16.
 */

import { Component } from '@angular/core';

@Component({
  templateUrl: 'app/home/home.component.html'
})
export class HomeComponent {
  getCurrentYear (): number {
    return new Date().getFullYear();
  }
}
