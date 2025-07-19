import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number = 0;

getMessages() {
  this.http.get<Message[]>('https://cjcms-be30f-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
}


  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

addMessage(message: Message) {
  if (!message) return;
  this.maxMessageId++;
  message.id = this.maxMessageId.toString();
  this.messages.push(message);
  this.storeMessages();
}


  getMaxId(): number {
  let maxId = 0;
  for (const message of this.messages) {
    const currentId = parseInt(message.id, 10);
    if (currentId > maxId) maxId = currentId;
  }
  return maxId;
}

storeMessages() {
  const messagesJson = JSON.stringify(this.messages);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.put(
    'https://cjcms-be30f-default-rtdb.firebaseio.com/messages.json',
    messagesJson,
    { headers }
  ).subscribe(() => {
  });
}



  constructor(private http: HttpClient) {

   }
}
