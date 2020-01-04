import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit,AfterContentInit {

  userEmail: string;
  map;
  options: GeolocationOptions;
  
  @ViewChild('mapElement', { static: true }) mapElement;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private geolocation: Geolocation
  ) {}


  ngAfterContentInit(): void {
    this.options = {
      enableHighAccuracy: true
      
    };
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      var lat = resp.coords.latitude
      var lng = resp.coords.longitude

      console.log(lat + " LAT-LONG " + lng)
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: { lat: lat, lng: lng },
          zoom: 16
        });

      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: lat,
        lng: lng
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(this.map);
    }).catch((error) => {
      console.log('Error getting location', error);
    });


   
    
  }
 
  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }
 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
