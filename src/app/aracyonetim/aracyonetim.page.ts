import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from "./car.service";
import { IonInfiniteScroll, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Car } from "./car";
import { ActionSheetOptions } from '@ionic-native/action-sheet';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { AuthService } from '../auth/auth.service';
import { AuthenticateService } from '../services/authentication.service';


@Component({
  selector: 'app-aracyonetim',
  templateUrl: './aracyonetim.page.html',
  styleUrls: ['./aracyonetim.page.scss'],
})
export class AracyonetimPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  cars: Car[];
  isUpdate: boolean;
  isAlertPlaka: boolean;
  isAlertGuzergah: boolean;
  isAlertSofor: boolean;

  car: Car = {
    plaka: '',
    sofor: '',
    guzergah: ''
  }


  constructor(
    private carService: CarService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheet: ActionSheet,
    private authService2: AuthenticateService,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.listCar();
    this.pageLoading();
    this.presentToast();
  }

  action() {
    try {
      const options: ActionSheetOptions = {
        title: 'What do you want with this image?',
        subtitle: 'Choose an action',
        buttonLabels: ['Share via Facebook', 'Share via Twitter'],
        addCancelButtonWithLabel: 'Cancel',
        addDestructiveButtonWithLabel: 'Delete',
        destructiveButtonLast: true
      };
      this.actionSheet.show(options).then((index: number) => {
        console.log('selected button index:' + index);
      });
      
    } catch (e) {
      console.log(e);
    }
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Yanlış giriş',
      message: 'Lütfen doğru giriş değerleri kullandığınıza emin olun.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sayfayı sağa kaydırarak gezinebilirsiniz.',
      duration: 2500
    });
    toast.present();
  }

  async pageLoading() {
    const loading = await this.loadingController.create({
      message: 'Sayfa yükleniyor. Lütfen bekleyiniz...',
      duration: 1000
    });
    await loading.present();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.cars.length == 15) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  listCar() {
    this.carService.getCars()
      .subscribe(data => {
        this.cars = data.map(e => {
          return {
            id: e.payload.doc.id,
            guzergah: e.payload.doc.data()['guzergah'],
            plaka: e.payload.doc.data()['plaka'],
            sofor: e.payload.doc.data()['sofor']
          }
        })
      });
  }

  alertCheck() {
    if (this.car.guzergah == '') {
      this.isAlertGuzergah = true;
    } else {
      this.isAlertGuzergah = false;
    }
    if (this.car.sofor == '') {
      this.isAlertSofor = true;
    } else {
      this.isAlertSofor = false;
    }
    if (this.car.plaka == '') {
      this.isAlertPlaka = true;
    } else {
      this.isAlertPlaka = false;
    }
  }

  add() {
    var count = 0;
    this.alertCheck();
    if (this.isAlertGuzergah == false && this.isAlertSofor == false && this.isAlertPlaka == false) {
      this.cars.forEach(car => {
        if (this.car.plaka == car.plaka && this.car.guzergah == car.guzergah && this.car.sofor == car.sofor) {
          count++;
        }
      });
      if (count == 0 && this.isCorrectPlaka() == true && this.isCorrectSofor() == true) {
        this.carService.addCar(this.car);
        this.car.guzergah = '';
        this.car.plaka = '';
        this.car.sofor = '';
      } else {
        this.alert();
      }
    }
  }

  delete(id: string) {
    this.carService.deleteCar(id);
    this.cancel();
  }

  update(id: string) {
    var count = 0;
    this.alertCheck();
    if (this.isAlertGuzergah == false && this.isAlertSofor == false && this.isAlertPlaka == false) {
      this.cars.forEach(car => {
        if (this.car.plaka == car.plaka && this.car.guzergah == car.guzergah && this.car.sofor == car.sofor) {
          count++;
        }
      });
      if (count == 0 && this.isCorrectPlaka() == true && this.isCorrectSofor() == true) {
        this.carService.updateCar(this.car, id);
        this.isUpdate = false;
        this.car.guzergah = '';
        this.car.plaka = '';
        this.car.sofor = '';
      } else {
        this.alert();
      }
    }
    this.listCar();
  }

  fill(car: Car) {
    this.car = car;
    this.isUpdate = true;
  }

  cancel() {
    this.isUpdate = false;
    this.car.guzergah = '';
    this.car.plaka = '';
    this.car.sofor = '';
    this.listCar();
  }

  isCorrectPlaka(): boolean {
    var elementValue = this.car.plaka;
    var v = elementValue.replace(/\s+/g, '').toUpperCase();
    var regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/; if (v.match(regex) == null) {
      console.log("Plaka formatı hatalı.");
      return false;
    } else {
      return true;
    }
  }

  isCorrectSofor(): boolean {
    var elementValue = this.car.sofor;
    var v = elementValue.replace(/\s+/g, '').toUpperCase();
    var regex = /^[a-zA-Z ?]+$/;
    if (v.match(regex) == null) {
      console.log("Sofor formatı hatalı.");
      return false;
    } else {
      return true;
    }
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
