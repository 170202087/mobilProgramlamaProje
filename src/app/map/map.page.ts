import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { FirestoreService, Passenger } from '../services/firestore.service';
import { AuthService } from "../auth/auth.service";
import { Router } from '@angular/router';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit {

  userType: string;
  map;
  options: GeolocationOptions;
  userLocation: { lat: number, lng: number }
  isCheck: boolean = true;
  @ViewChild('mapElement', { static: true }) mapElement;
  constructor(
    private navCtrl: NavController,
    private authService2: AuthenticateService,
    private geolocation: Geolocation,
    private fireStore: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userLocation = { lat: 0, lng: 0 };
    if (this.fireStore.user == null) {
      this.navCtrl.navigateBack("/");
    }
    this.userType = this.fireStore.user.docType;
    console.log(this.fireStore.user);
  }

  timer : any;

  startTimer() {

    this.getPosition();

     this.timer = setInterval(() => {
      this.getPosition();
      console.log("Position gotten...");
    }, 15000);

  }

  getPosition() {

    if (this.userType == "s" && this.isCheck) {
      this.options = {
        enableHighAccuracy: true,
      };
      this.geolocation.getCurrentPosition(this.options).then((resp) => {

        this.userLocation = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        this.showMap();
        this.fireStore.setLatLng(this.fireStore.user.eMail,this.userLocation.lat,this.userLocation.lng);
        console.log(this.userLocation.lat + " LAT-LONG " + this.userLocation.lng)

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    } else if (this.userType == "k") {

      this.getLatLongFromDB();

    }

  }

  getLatLongFromDB() {
    var usr = this.fireStore.user as Passenger

    var sub = this.fireStore.getLatLong(usr.serviceMail).subscribe(data => {

      this.userLocation = {
        lat: data.payload.data()["lat"],
        lng: data.payload.data()["long"]
      };
      this.showMap();
      console.log(this.userLocation);
      sub.unsubscribe();
    });
  }

  showMap() {

    let latLng = new google.maps.LatLng(this.userLocation.lat, this.userLocation.lng);
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: false,
    });
    new google.maps.Marker({
      map: this.map,
      position: latLng
    });
  }
  ngAfterContentInit(): void {



  }


  ngOnInit() {

    this.startTimer();

  }

  logout() {
    this.authService2.logoutUser()
      .then(res => {
        console.log(res);
        clearInterval(this.timer);
        this.authService.logout();
        this.router.navigate(['/tabs/login']);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
