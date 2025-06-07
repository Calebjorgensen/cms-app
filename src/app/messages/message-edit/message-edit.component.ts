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

    @ViewChild('id') idInput: ElementRef;
    @ViewChild('subject') subjectInput: ElementRef;
    @ViewChild('msgText') msgTextInput: ElementRef;
    @ViewChild('sender') senderInput: ElementRef;


    constructor(private messageService: MessageService) {}

  onSendMessage() {
    const mId = this.idInput.nativeElement.value;
    const mSubject = this.subjectInput.nativeElement.value;
    const mMsgText = this.msgTextInput.nativeElement.value;
    const mSender = this.senderInput.nativeElement.value;
    const newMessage = new Message(mId, mSubject, mMsgText, mSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
