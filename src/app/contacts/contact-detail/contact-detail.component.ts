import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
    contact: Contact;
    id: string;

    constructor (
      private contactServive: ContactService,
      private route: ActivatedRoute,
      private router: Router){

      }

      ngOnInit() {
        this.route.params
          .subscribe(
            (params: Params) => {
              this.id = params['id'];
              this.contact = this.contactServive.getContact(this.id);
            }
          );
      }

      onEditContact(){
        this.router.navigate(['edit'], {relativeTo: this.route});
      }

      onDelete(){
        this.contactServive.deleteContact(this.contact);
        this.router.navigateByUrl('/id/edit')
      }

}
