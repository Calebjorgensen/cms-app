import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  this.http.get<Document[]>('https://cjcms-be30f-default-rtdb.firebaseio.com/documents.json')
    .subscribe({
      next: (documents) => {
        this.documents = documents || [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
      }
    });
}




  getDocument(index:string) {
    return this.documents[index]
  }

addDocument(newDocument: Document) {
  if (!newDocument) return;

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);

  this.storeDocuments();
}



updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) return;

  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) return;

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;

  this.storeDocuments();
}




deleteDocument(document: Document) {
  if (!document) return;

  const pos = this.documents.indexOf(document);
  if (pos < 0) return;

  this.documents.splice(pos, 1);

  this.storeDocuments();
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

  storeDocuments() {
  const documentsJson = JSON.stringify(this.documents);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.put(
    'https://cjcms-be30f-default-rtdb.firebaseio.com/documents.json',
    documentsJson,
    { headers: headers }
  ).subscribe(() => {
    this.documentListChangedEvent.next(this.documents.slice());
  });
}




  constructor(private http: HttpClient) {
    this.maxDocumentId =  0;
   }
}
