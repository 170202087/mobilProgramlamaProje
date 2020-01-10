import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

class User {


  eMail: string
  docType: string
  messages: Array<Map<any, any>>;

}

@Injectable()
export class FirestoreService {
  user: User = null;

  constructor(private firestore: AngularFirestore) { }

  writeDataAfterRegisteration(value) {

    let data = {}
    console.log(value.user);
    if (value.user == "k") {
      data["Mail"] = value.email;
      data["ServiceMail"] = value.usage;
      var userMails = [];
      this.firestore.collection("Users").doc(value.email).set(data);
      var subs = this.firestore.collection("Services").doc(value.usage).snapshotChanges().subscribe(data => {

        userMails = data.payload.data()["UserMails"] as Array<String>;
        userMails.push(value.email);
        console.log(userMails);
        this.firestore.collection("Services").doc(value.usage).update({ "UserMails": userMails });
        this.firestore.collection("Services").doc(value.usage).collection("Messages").doc(value.email).
          set(
            {
              "messages": [{ "from": "", "to": "", "message": "", "isRead": false },
              ]
            });
        subs.unsubscribe()
      });

    } else if ("s") {
      data["Mail"] = value.email;
      data["lat"] = 0;
      data["long"] = 0;
      data["UserMails"] = [];
      data["Route"] = value.usage
      this.firestore.collection("Services").doc(value.email).set(data);
    }

  }

  findUserByEmail(email: string) {
    return this.firestore.collection("Users").snapshotChanges();

  }

  findDriverByEmail(email: string) {

    return this.firestore.collection("Services").snapshotChanges();

  }

  getLatLong(email: string) {

    return this.firestore.collection("Services").doc(email).snapshotChanges();
  }

  getMessages(email: string) {
    return this.firestore.collection("Services").doc(email).collection("Messages").snapshotChanges();
  }
  setLatLng(email,lat,lng){

    this.firestore.collection("Services").doc(email).update({"lat":lat,"long":lng});

  }

  sendMessage(message, sMail, uMail, userType) {

    var sub = this.firestore.collection("Services").doc(sMail).collection("Messages").doc(uMail).snapshotChanges().subscribe(data => {

      var lastMessages = data.payload.data();
      var from: string;
      var to: string;
      var controlMail: string;
      if (userType == "k") {
        from = "user"
        to = "service"
        controlMail = sMail;
      } else {
        from = "service"
        to = "user"
        controlMail = uMail;

      }
      var newMessage = {

        "from": from,
        "to": to,
        "message": message,
        "isRead": false
      }
      lastMessages["messages"].push(newMessage);
      this.user.messages.forEach(data => {

        
        if (data["id"] == controlMail) {

          data["messages"].push(newMessage);
          console.log("girdi");

        }

      });
      console.log(this.user.messages);
      this.firestore.collection("Services").doc(sMail).collection("Messages").doc(uMail).set(lastMessages);
      sub.unsubscribe();

    });

  }

}



export class Passenger extends User {

  serviceMail: string;

  constructor(sMail: string, mail: string, messages) {
    super();
    this.eMail = mail;
    this.serviceMail = sMail;
    super.docType = "k"
    this.messages = messages;

  }

}

export class Driver extends User {

  lat: number;
  lng: number;
  passengerMails: [string]

  constructor(mail: string, passMails: [string], messages) {
    super();
    this.eMail = mail
    this.passengerMails = passMails
    super.docType = "s"
    this.messages = messages;

  }





}

