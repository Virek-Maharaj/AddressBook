import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {map, shareReplay} from 'rxjs/operators';
import { Contacts } from './page/address-book/address-book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Address Book';
  @ViewChild(MatSidenav)sideNav!: MatSidenav;
  handset!: boolean;
  editPage:boolean = false;
  editContact:Contacts = {} as Contacts;

  constructor( private breakpointObserver: BreakpointObserver,
    private router: Router){

  }

  readonly $handset = this.breakpointObserver.observe('(max-width: 640px)')
  .pipe(
    map(next => next.matches),
    shareReplay(1)
  );

  searchContacts(){
    this.editPage = false;
    this.router.navigate(['address-book'])
  }
}
