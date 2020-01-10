// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB5Yu1U1dywUhStSdgtHA84I7xHP5cfOKU",
    authDomain: "ionic4-4f18c.firebaseapp.com",
    databaseURL: "https://ionic4-4f18c.firebaseio.com",
    projectId: "ionic4-4f18c",
    storageBucket: "ionic4-4f18c.appspot.com",
    messagingSenderId: "891619772360"
  }
};



/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB5Yu1U1dywUhStSdgtHA84I7xHP5cfOKU",
    authDomain: "ionic4-4f18c.firebaseapp.com",
    databaseURL: "https://ionic4-4f18c.firebaseio.com",
    projectId: "ionic4-4f18c",
    storageBucket: "ionic4-4f18c.appspot.com",
    messagingSenderId: "891619772360",
    appId: "1:891619772360:web:a992e5bfcd4c9fb171a2fd",
    measurementId: "G-Y9PDHKM563"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
