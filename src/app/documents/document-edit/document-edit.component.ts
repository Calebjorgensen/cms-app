import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {

  @ViewChild('f') documentForm: NgForm;

  id: string;

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if(!this.id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);

      if(!this.originalDocument){
        return;
      }
      this.editMode = true;

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm){
    const value = form.value;

    const newDocument = new Document(
      this.id,
      value.name,
      value.description,
      value.url,
      value.children
    );

    if(this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
}
