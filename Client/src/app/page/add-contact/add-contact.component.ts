import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DialogService } from 'src/app/custom/dialog/dialog.service';
import { LogService } from 'src/app/custom/log/log.service';
import { SnackService } from 'src/app/custom/snack/snack.service';
import { Contacts } from '../address-book/address-book.model';
import { AddContactService } from './add-contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  form: FormGroup;
  contactToAdd: Contacts = {} as Contacts;
  updatedDate!: string ;

  constructor(
    private log: LogService,
    private builder: FormBuilder,
    private snack: SnackService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private addContactService:AddContactService,
    public app:AppComponent
  ) 
  {
    if(this.app.editPage){
      this.form = builder.group({
        firstName: builder.control(this.app.editContact.firstName, Validators.required),
        surname: builder.control(this.app.editContact.surname, Validators.required),
        birthDate: builder.control(this.app.editContact.birthDate, Validators.required),
        address: builder.control(this.app.editContact.address, Validators.required),
        telephone: builder.control(this.app.editContact.telephone, Validators.required),
        cell: builder.control(this.app.editContact.cell, Validators.required),
        email: builder.control(this.app.editContact.email, Validators.required),
      });
    }else{
      this.form = builder.group({
        firstName: builder.control(null, Validators.required),
        surname: builder.control(null, Validators.required),
        birthDate: builder.control(null, Validators.required),
        address: builder.control(null, Validators.required),
        telephone: builder.control(null, Validators.required),
        cell: builder.control(null, Validators.required),
        email: builder.control(null, Validators.required),
      });
    }
  }

  ngOnInit(): void {
    this.log.info(new Date().toISOString())
  }

  onDateChange(event: any) {}

  onAdd(){
    this.log.info("form:",this.form.value)
    //this.updatedDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd') as string;
    this.updatedDate = new Date().toISOString();
    this.log.info(this.updatedDate)
    this.contactToAdd = this.form.value;
    this.contactToAdd.birthDate = this.datepipe.transform(this.contactToAdd.birthDate, 'yyyy-MM-dd') as string;
    this.contactToAdd.updatedDate = this.updatedDate;
    this.log.info("contactToAdd:",this.contactToAdd)

    this.addContactService.addContact(this.contactToAdd).subscribe(
      next=>{
        this.log.info(next)
        this.snack.open('Added Contact')
        this.router.navigate(['address-book'])
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
  onCancel(){
    this.router.navigate(['address-book'])
    this.app.editPage = false;
  }
  onUpdate(){
    this.contactToAdd = this.form.value;
    this.contactToAdd.birthDate = this.datepipe.transform(this.contactToAdd.birthDate, 'yyyy-MM-dd') as string;
    this.contactToAdd.updatedDate = this.updatedDate;
    this.contactToAdd.contactId = this.app.editContact.contactId;
    this.log.info("contactToAdd:",this.contactToAdd)

    this.addContactService.editContact(this.contactToAdd).subscribe(
      next=>{
        this.log.info(next)
        this.snack.open('Updated Contact')
        this.router.navigate(['address-book'])
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

}
