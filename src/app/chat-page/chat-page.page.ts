import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirestoreService, Passenger, Driver } from "../services/firestore.service";
import { AuthService } from '../auth/auth.service';
import { AuthenticateService } from '../services/authentication.service';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  allMessageProp: Array<Map<String, any>>;
  messages: Array<Map<String, any>>;
  id: string;
  userType: string;
  sMail: string;
  uMail: string;
  messageBoxInput: string;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService2: AuthenticateService,
    private fireStore: FirestoreService,
    private authService: AuthService
    ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: Array<Map<String, any>>
      userType: string
      uMail: string,
      sMail: string
    };

    this.userType = state.userType;
    console.log(this.userType);
    this.allMessageProp = state.message;
    this.id = this.allMessageProp["id"];
    this.messages = this.allMessageProp["messages"];
    
    if (state.uMail == ".") {
      this.uMail = this.id;
      this.sMail = state.sMail;

    } else {

      this.uMail = state.uMail;
      this.sMail = state.sMail;

    }


    console.log(this.messages);
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  sendMessage() {
    console.log(this.messageBoxInput);
    this.fireStore.sendMessage(this.messageBoxInput, this.sMail, this.uMail, this.userType);
    this.messageBoxInput = "";

  }

  logout() {
    this.authService2.logoutUser()
      .then(res => {
        console.log(res);
        this.authService.logout();
        this.router.navigate(['/tabs/login']);
      })
      .catch(error => {
        console.log(error);
      })
  }
  

}
