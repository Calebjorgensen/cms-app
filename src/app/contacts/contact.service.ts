import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  this.http.get<Contact[]>('https://cjcms-be30f-default-rtdb.firebaseio.com/contacts.json')
    .subscribe({
      next: (contacts) => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
}




  getContact(index: string) {
    return this.contacts[index];
  }

addContact(newContact: Contact) {
  if (!newContact) return;
  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  this.storeContacts();
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
  if (!contact) return;
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) return;
  this.contacts.splice(pos, 1);
  this.storeContacts();
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

storeContacts() {
  const contactsJson = JSON.stringify(this.contacts);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.put(
    'https://cjcms-be30f-default-rtdb.firebaseio.com/contacts.json',
    contactsJson,
    { headers }
  ).subscribe(() => {
    this.contactListChangedEvent.next(this.contacts.slice());
  });
}


  constructor(private http: HttpClient) {
    this.maxContactId = 0;
   }

  
}
