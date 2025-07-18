import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute

  ){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if(!this.id){
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);

      if(!this.originalContact){
        return;
      }

      this.editMode = true;

      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.contact.group && this.contact.group.length > 0){
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm){
    const value = form.value;

    const newContact = new Contact(
      this.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    }else{
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts'])
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  onDrop(event: CdkDragDrop<any>){
    const draggedContact = event.item.data;

    if(this.isInvalidContact(draggedContact)) {
      return;
    }

    this.addToGroup(draggedContact);
  }

  isInvalidContact(newContact: Contact): boolean { 
    if(!newContact) return true;

    if(this.contact && newContact.id === this.contact.id){
      return true;
    }
    return this.groupContacts.some(contact => contact.id == newContact.id);

  }

  addToGroup(contact: Contact){
    this.groupContacts.push(this.contact);
  }
}
