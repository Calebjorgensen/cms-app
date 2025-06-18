import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {


  documents: Document[] = [];
  di: string = '';

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  

  ngOnInit() {

    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );



    this.documents = this.documentService.getDocuments();
  }

}
