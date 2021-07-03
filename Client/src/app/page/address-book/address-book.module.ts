import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from 'src/app/custom/log/log.service';
import { AddressBookRoutingModule } from './address-book-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddressBookComponent } from './address-book.component';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GrowDirective } from 'src/app/custom/grow.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddressBookService } from './address-book.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackService } from 'src/app/custom/snack/snack.service';
import { SnackModule } from 'src/app/custom/snack/snack.module';





@NgModule({
  declarations: [AddressBookComponent,GrowDirective],
  imports: [
    CommonModule,
    AddressBookRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    SnackModule
  ],
  exports:[
    GrowDirective
  ],
  providers:[AddressBookService]
})
export class AddressBookModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
 }
