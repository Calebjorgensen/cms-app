import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  private maxContactId: number;
  
  getContacts() {
    return this.contacts.slice();
  }


  getContact(index: string) {
    return this.contacts[index];
  }

addContact(newContact: Contact) {
  if(!newContact){
    return;
  }
  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  const contactListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactListClone);
}

updateContact(originalContact: Contact, newContact: Contact) {
  if(!originalContact || !newContact){
    return;
  }

  const pos = this.contacts.indexOf(originalContact);
  if(pos < 0){
    return;
  }

  newContact.id = originalContact.id;
  this.contacts[pos] = newContact;
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
}



deleteContact(contact: Contact) {
  if(!document){
    return;
  }
  const pos = this.contacts.indexOf(contact);
  if(pos < 0) {
    return;
  }
  this.contacts.splice(pos, 1);
  const contactListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactListClone);
}



getMaxId(): number{
  let maxId = 0;

  for(const contact of this.contacts) {
    const currentId = parseInt(contact.id, 10);
    if(currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
}

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  
}
