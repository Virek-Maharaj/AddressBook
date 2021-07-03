import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LogService } from 'src/app/custom/log/log.service';
import { AddressBookComponent } from './address-book.component';




const routes: Routes = [{path: '', component: AddressBookComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressBookRoutingModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
}
