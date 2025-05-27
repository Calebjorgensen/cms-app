import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>;


  documents: Document[] = [
    new Document(1, 'Certificate', 'This is a certificate for The company A! ', '....', null),
    new Document(2, 'PDF', 'This is PDF File', '.1..1', null)
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
