import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'

// const randomMessages = [
//   'Nice to meet you',
//   'How are you?',
//   'Not too bad, thanks',
//   'What do you do?',
//   'Is there anything else I can help you with?',
//   'That\'s awesome',
//   'Angular Elements is the bomb 💣 ',
//   'Can you explain in more detail?',
//   'Anyway I\'ve gotta go now',
//   'It was a pleasure to chat with you',
//   'We are happy to make you a custom offer!',
//   'Bye',
//   ':)',
// ]

// const rand = max => Math.floor(Math.random() * max)

// const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit, OnChanges {

  @ViewChild('bottom') bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'
  @Input() responseMessage: any;
  @Output() requestedMessage = new EventEmitter();
  public _visible = false

  public get visible() {
    return this._visible
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.responseMessage.currentValue !== undefined ) {
      this.addMessage(this.operator, changes.responseMessage.currentValue, 'received')
    }
  }


  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator = {
    name: 'chatBot',
    status: 'online',

  }

  public client = {
    name: 'Guest User',
    status: 'online',
  }

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  ngOnInit() {
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, I would be happy to assist you.Please enter the name of state to know Live status-', 'received')
    }, 1500)
  }

  public toggleChat() {
    this.visible = !this.visible
    this.messages = [];
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, I would be happy to assist you.Please enter the name of state to know Live status-', 'received')
    }, 1500)
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.addMessage(this.client, message, 'sent')
    this.requestedMessage.emit(message)
   // setTimeout(() => this.randomMessage(), 1000)
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}
