import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
@Injectable()
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  writeDataAfterRegisteration(uid: string, sid: string) {

    if (uid == "null") {
      this.firestore.collection("Services").doc(sid).set(
        {
          "sid": sid,
          "lat": 0,
          "lng": 0
        }
      )
    } else {
      this.firestore.collection("Users").doc(uid).set(
        {
          "sid": sid,
          "uid": uid
        }
      )
    }
  }
}
