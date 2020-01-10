import { Component, OnInit } from '@angular/core';
import { FirestoreService, Passenger, Driver } from '../services/firestore.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages : Array<Map<any , any>>;
  usr : any;
  uMail: string;
  sMail : string;
  constructor(private fireStore: FirestoreService,private router:Router,
  ) { 
    if(this.fireStore.user.docType == "k"){
      this.sMail = (this.fireStore.user as Passenger).serviceMail;
      this.uMail = (this.fireStore.user as Passenger).eMail; 
    }else{
      this.sMail = (this.fireStore.user as Driver).eMail;
      this.uMail = ".";
    }
    this.usr = this.fireStore.user
    this.messages = (this.fireStore.user).messages
  }

  ngOnInit() {
  }

  openMessage(chatbox) {
    console.log(chatbox);
    const navigationExtras: NavigationExtras = {
      state: {
        message : chatbox,
        userType : this.usr.docType,
        uMail : this.uMail,
        sMail : this.sMail,
      }
    };
    this.router.navigate(["chat-page"],navigationExtras)
  }

}
