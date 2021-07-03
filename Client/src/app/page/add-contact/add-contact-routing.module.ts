import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LogService } from 'src/app/custom/log/log.service';
import { AddContactComponent } from './add-contact.component';





const routes: Routes = [{path: '', component: AddContactComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddContactRoutingModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
}
