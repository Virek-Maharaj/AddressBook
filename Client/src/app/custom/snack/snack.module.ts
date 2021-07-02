import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LogService } from '../log/log.service';

import {SnackService} from './snack.service';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [SnackService]
})
export class SnackModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
}
