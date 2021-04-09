// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  urlApi: 'https://southamerica-east1-econta-operative.cloudfunctions.net/api',
  urlApiElastic: '',
  urlApiDocuments: 'https://operativenode.azurewebsites.net/api/econta/documents',
  apiOperativeBaseUrl: 'https://operativenode.azurewebsites.net/api',
  production: false,
  firebase: {
    apiKey: "AIzaSyAm_mUdo4NT7knsqXxP7kKp1FK0NO9tWcw",
    authDomain: "econta-operative.firebaseapp.com",
    databaseURL: "https://econta-operative.firebaseio.com",
    projectId: "econta-operative",
    storageBucket: "econta-operative.appspot.com",
    messagingSenderId: "21290055426",
    appId: "1:21290055426:web:9bb7f3e69abfb689"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
