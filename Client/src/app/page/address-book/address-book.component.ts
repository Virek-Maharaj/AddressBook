import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { LogService } from 'src/app/custom/log/log.service';
import { SnackService } from 'src/app/custom/snack/snack.service';
import { Contacts } from './address-book.model';
import { AddressBookService } from './address-book.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  form: FormGroup;
  public $models: BehaviorSubject<Contacts[] | null> = new BehaviorSubject<Contacts[] | null>([]);
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;


  constructor(private log: LogService,
    private builder: FormBuilder,
    private addressService:AddressBookService,
    private snack: SnackService,
    private router: Router,
    private app:AppComponent) 
  {
    log.construct(this.constructor.name);
    this.form = builder.group({
      firstName: builder.control(null),
      surname: builder.control(null),
      cell: builder.control(null)
    });
  }

  ngOnInit(): void {
    //this.$models.next(this.dummyData)
    this.getPartyDetails(this.form.value);
  }

  onSearch(){
    this.getPartyDetails(this.form.value);
  }

  onAdd(){
    this.router.navigate(['add-contact'])
  }

  onDelete(row:any){
    this.log.info(row)
    this.addressService.deleteContact(row.contactId).subscribe(
      next=>{
        this.getPartyDetails(this.form.value);
      },
      err=>{
        this.log.info(err);
        if (err.error.messages != null) {
          this.log.info("In here:", err.error.messages)
          this.snack.open(err.error.messages)
        } else {
          this.snack.open(err.status + ": " + err.statusText)
        }
      }
    )
  }

  onEdit(row:any){
    this.app.editPage = true;
    this.app.editContact = row;
    this.log.info(this.app.editContact)
    this.router.navigate(['add-contact'])
  }

  getPartyDetails(contact:Contacts){
    this.addressService.getContactDetails(contact)
    .subscribe(
      (next: Contacts[] | null) => {
        this.log.info("Party Results:", next)
        this.$models.next(next)
      },
      (err: any) => {
        this.log.info(err);
        if (err.error.messages != null) {
          this.log.info("In here:", err.error.messages)
          this.snack.open(err.error.messages)
        } else {
          this.snack.open(err.status + ": " + err.statusText)
        }
      }
    )
  }

}
