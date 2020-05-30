import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from '@pages/contacts/contacts.component';
import { ContactsRoutingModule } from '@pages/contacts/contacts-routing.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ContactsRoutingModule],
})
export class ContactsModule {}
