
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { FirestoreService, Passenger, Driver } from '../../services/firestore.service';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService2: AuthenticateService,
    private formBuilder: FormBuilder,
    private fireStore: FirestoreService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  loginUser(value) {
    this.authService2.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";

        var userSub = this.fireStore.findUserByEmail(value.email).subscribe(data => {


          var datas = data.map(e => {
            return {
              id: e.payload.doc.id,
              Mail: e.payload.doc.data()["Mail"],
              ServiceMail: e.payload.doc.data()["ServiceMail"]
            };
          });

          datas.forEach(data => {
            console.log(data);

            if (data.id as string == value.email as string) {
             var sub = this.fireStore.getMessages(data.ServiceMail).subscribe(Messages => {

                var allMessages = Messages.map(e => {
                  return {
                    id: e.payload.doc.id,
                    messages: e.payload.doc.data()["messages"],
                  };
                });
                allMessages.forEach(msg => {
                  if (msg.id == data.Mail as string) {
                    msg["id"] = data.ServiceMail;
                    var messagesWithID = [msg]
                    this.fireStore.user = new Passenger(data.ServiceMail, data.Mail, messagesWithID);

                    this.authService.login().subscribe(() => {
                      if (this.authService.isLoggedIn) {
            
                        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/tabs';
            
                        this.router.navigateByUrl(redirect);
                      }
                    });

                  }
                });
                sub.unsubscribe();

              });

            }

          });


          userSub.unsubscribe();
        });

        var driverSub = this.fireStore.findDriverByEmail(value.email).subscribe(data => {

          var datas = data.map(e => {
            return {
              id: e.payload.doc.id,
              Mail: e.payload.doc.data()["Mail"],
              Route: e.payload.doc.data()["Route"],
              UserMails: e.payload.doc.data()["UserMails"],
              Lat: e.payload.doc.data()["lat"],
              Long: e.payload.doc.data()["long"],
            };
          });

          datas.forEach(data => {

            if (data.id == value.email) {
              var sub = this.fireStore.getMessages(data.Mail).subscribe(Messages => {

                var allMessages = Messages.map(e => {
                  return {
                    id: e.payload.doc.id,
                    messages: e.payload.doc.data()["messages"],
                  };
                });
                console.log(allMessages, " Servis Mesajlar")
                this.fireStore.user = new Driver(data.Mail, data.UserMails, allMessages);
                this.authService.login().subscribe(() => {
                  if (this.authService.isLoggedIn) {
        
                    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/tabs';
        
                    this.router.navigateByUrl(redirect);
                  }
                });
                sub.unsubscribe();
              });
            }

          });


          driverSub.unsubscribe();

        });




      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage(event: any) {
    this.navCtrl.navigateForward('/register');
    console.log("basıyor");
  }

}