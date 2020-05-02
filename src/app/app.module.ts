import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, Injector } from '@angular/core'
import { AppComponent } from './app.component'
import { ChatWidgetComponent, ChatConfigComponent, ChatModule } from './chat'
import { createCustomElement } from '@angular/elements'

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule,ChatModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  entryComponents:[ChatWidgetComponent,ChatConfigComponent]

})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const chatConfig = <any>createCustomElement(ChatConfigComponent, {
      injector: this.injector,
    })
    const chatWidget = <any>createCustomElement(ChatWidgetComponent, {
      injector: this.injector,
    })
    customElements.define('chat-config', chatConfig)
    customElements.define('chat-widget', chatWidget)
  }
}
