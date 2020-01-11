import { Injectable } from '@angular/core';
import { Car } from "./car";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carCollection: AngularFirestoreCollection<Car>;
  cars: Observable<Car[]>;
  carDoc: AngularFirestoreDocument<Car>;

  constructor(private db: AngularFirestore) {
    this.carCollection = this.db.collection('cars');
  }

   getCars(){
     return this.db.collection('cars').snapshotChanges();
   }

   addCar(car: Car){
    this.carCollection.add(car);
   }

   deleteCar(id: string){
    this.db.doc(`cars/${id}`).delete();
   }

   updateCar(car: Car, id: string){
    this.db.doc(`cars/${id}`).update(car);
   }
}
