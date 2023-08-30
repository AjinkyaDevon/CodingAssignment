import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit,OnDestroy {
  isLoading=false;
  contacts:Contact[]=[];
  contactsUpdatedSubscription:Subscription;
  constructor(private contactService:ContactService,private apiService:ApiService){

  }
  ngOnDestroy(): void {
    this.contactsUpdatedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.contacts=this.contactService.getContacts();
    this.contactsUpdatedSubscription=this.contactService.contactsUpdatedEvent.subscribe(()=>{
      this.contacts=this.contactService.getContacts();
    })
    this.apiService.getContact(0,100).subscribe((contacts:Contact[])=>{
        this.contactService.setContacts(contacts);
        this.isLoading=false;
    });
  }

}

