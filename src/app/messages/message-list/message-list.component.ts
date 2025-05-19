import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  @Output() selectedMessageEvent = new EventEmitter<Message>();


  messages: Message[] = [
    new Message(1, 'Test', 'This is a test text message', 'Admin'),
    new Message(2, 'Fishing', 'Look at this fish', 'Dan'),
    new Message(3, 'Work', 'Is that Project done', 'Craig')
  ];

  onAddMessage(message: Message) {
    this.selectedMessageEvent.emit(message);
  }

}
