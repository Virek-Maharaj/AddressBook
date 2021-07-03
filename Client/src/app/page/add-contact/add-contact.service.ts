import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from 'src/app/custom/log/log.service';
import { Contacts } from '../address-book/address-book.model';



@Injectable()
export class AddContactService {
  constructor(
    private log: LogService,
    private http: HttpClient
  ) {
    log.construct(this.constructor.name);
  }

  addContact(model:Contacts):Observable<Contacts>{
    this.log.info({ addContact: model });
    return this.http.post<Contacts>(`https://localhost:44348/api/contacts`,model)
  }

  editContact(model:Contacts):Observable<Contacts>{
    this.log.info({ editContact: model });
    return this.http.put<Contacts>(`https://localhost:44348/api/contacts/${model.contactId}`,model)
  }

}