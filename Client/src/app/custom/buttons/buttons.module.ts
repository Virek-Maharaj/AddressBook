import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import { LogService } from '../log/log.service';
import { ButtonsComponent } from './buttons.component';


@NgModule({
  imports: [CommonModule],
  exports: [ButtonsComponent],
  declarations: [ButtonsComponent]
})
export class ButtonsModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
}
