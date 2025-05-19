import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

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
    @Output() messageAdded = new EventEmitter<Message>();

  onSendMessage() {
    const mSubject = this.subjectInput.nativeElement.value;
    const mMsgText = this.msgTextInput.nativeElement.value;

    //Create a new Mesage Object
    const newMessage = new Message(
      1,
      mSubject,
      mMsgText,
      this.currentSender
    );

    //Emit the new message
    this.messageAdded.emit(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
