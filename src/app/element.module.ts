import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Injector, NgModule } from '@angular/core'

import { createCustomElement } from '@angular/elements'
import { ChatModule, ChatWidgetComponent, ChatConfigComponent } from './chat/'

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ChatModule],
  exports: [ChatModule],
  entryComponents:[ChatWidgetComponent,ChatConfigComponent]
})
export class ElementModule {
  constructor(private injector: Injector) {
    const chatConfig = <any>createCustomElement(ChatConfigComponent, {
      injector: this.injector,
    })
    const chatWidget = <any>createCustomElement(ChatWidgetComponent, {
      injector: this.injector,
    })
    customElements.define('chat-config', chatConfig)
    customElements.define('chat-widget', chatWidget)
  }

  ngDoBootstrap() {
  }
}
