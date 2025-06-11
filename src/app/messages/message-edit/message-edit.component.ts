import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
    currentSender = 'Caleb Jorgensen'

    @ViewChild('subject') subjectInput: ElementRef;
    @ViewChild('msgText') msgTextInput: ElementRef;

    constructor(private messageService: MessageService) {}

  onSendMessage() {
    const mSubject = this.subjectInput.nativeElement.value;
    const mMsgText = this.msgTextInput.nativeElement.value;
    const newMessage = new Message('', mSubject, mMsgText, '8'); // We need a default sender with an Id that exsists in contacts or a way to handle unknown senders.
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
