import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from 'src/app/custom/log/log.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { SnackModule } from 'src/app/custom/snack/snack.module';
import { AddContactComponent } from './add-contact.component';
import { AddContactRoutingModule } from './add-contact-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { AddContactService } from './add-contact.service';

@NgModule({
  declarations: [AddContactComponent],
  imports: [
    CommonModule,
    AddContactRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    SnackModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule
  ],
  providers:[AddContactService]
})
export class AddContactModule {
  constructor(private log: LogService) {
    log.construct(this.constructor.name);
  }
 }
