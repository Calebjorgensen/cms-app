import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {


  documents: Document[] = [];
  id: string = '';
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {
    
  }

  

ngOnInit() {
  this.documentService.getDocuments(); // just triggers the HTTP GET
  this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documents: Document[]) => {
      this.documents = documents;
    });
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
