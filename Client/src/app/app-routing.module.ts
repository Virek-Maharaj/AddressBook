import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'address-book',
    loadChildren: () => import('./page/address-book/address-book.module').then(m => m.AddressBookModule),
    canLoad: []
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./page/add-contact/add-contact.module').then(m => m.AddContactModule),
    canLoad: []
  },
  {path: '**', redirectTo: 'address-book'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
