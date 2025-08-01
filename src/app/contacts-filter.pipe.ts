import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts/contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if(!term || term.trim().length === 0){
      return contacts;
    }

    const filterContacts = contacts.filter(
      (contact: Contact) => 
        contact.name.toLowerCase().includes(term.toLowerCase())
    );
    
    return filterContacts.length > 0 ? filterContacts : contacts;
  }

}
