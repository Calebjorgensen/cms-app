import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  
  documents: Document[] = [];
  private maxDocumentId: number;

  getDocuments() {
    return this.documents.slice();
  }


  getDocument(index:string) {
    return this.documents[index]
  }

addDocument(newDocument: Document) {
  if(!newDocument) {
    return;
  }

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();

  this.documents.push(newDocument);

  const documentListCLone = this.documents.slice();
  this.documentListChangedEvent.next(documentListCLone);
}


updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.indexOf(originalDocument);
  if(pos < 0) {
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;

  const documentListCLone = this.documents.slice();
  this.documentChangedEvent.next(documentListCLone);
}



  deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    const documentListCLone = this.documents.slice();
    this.documentListChangedEvent.next(documentListCLone);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }



  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }
}
