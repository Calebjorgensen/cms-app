import { Component, } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {



  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages(); // triggers HTTP GET

    this.subscription = this.messageService.messageChangedEvent
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

}