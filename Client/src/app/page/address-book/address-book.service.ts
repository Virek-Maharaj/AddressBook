import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from 'src/app/custom/log/log.service';
import { Contacts } from './address-book.model';



@Injectable()
export class AddressBookService {
  constructor(
    private log: LogService,
    private http: HttpClient
  ) {
    log.construct(this.constructor.name);
  }



  getContactDetails(model: Contacts) :Observable<Contacts[]>{
    //scrub(model)
    this.log.info({ getContactDetails: model });
    let params = new HttpParams();
    if (model.firstName != null) {
      params = params.set('firstName', `${model.firstName}`);
    }
    if (model.surname != null) {
      params = params.set('surname', `${model.surname}`);
    }
    if (model.cell != null) {
      params = params.set('cell', `${model.cell}`);
    }
    //params = params.set('_fields', 'id,idNumber,name,surname,mobile,gender,idType,citizen');
    return this.http.get<Contacts[]>(`https://localhost:44348/api/contacts`,{ params })
  }

  deleteContact(id:number):Observable<Contacts>{
    return this.http.delete<Contacts>(`https://localhost:44348/api/contacts/${id}`)
  }

}