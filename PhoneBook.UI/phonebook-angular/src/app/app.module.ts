import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import {HeaderComponent} from './header/header.component';
import {AppRouterModule} from './app-router.module';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';
import { ContactComponent } from './contact/contact.component';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    ContactEditComponent,
    ContactItemComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
