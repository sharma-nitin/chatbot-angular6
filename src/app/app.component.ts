import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    
    <chat-widget [theme]="theme"></chat-widget>
  `,
})
export class AppComponent {
  public theme = 'blue'
}
