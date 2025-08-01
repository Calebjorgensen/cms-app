import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  private subscription: Subscription;
  

    contacts: Contact[] = [];
    term: string = '';

    constructor(private contactService: ContactService) {}



ngOnInit() {
  this.contactService.getContacts(); // just triggers the HTTP GET

  this.subscription = this.contactService.contactListChangedEvent
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
}


    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    search(value:string){
      this.term = value;
    }
}
