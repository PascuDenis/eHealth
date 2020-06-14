// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ////  for eHealth application
  firebaseConfig: {
    apiKey: "AIzaSyCIsBjYJBNw-4dM1lsVMVxjqG5sUjljWQE",
    authDomain: "ehealth-d859a.firebaseapp.com",
    databaseURL: "https://ehealth-d859a.firebaseio.com",
    projectId: "ehealth-d859a",
    storageBucket: "ehealth-d859a.appspot.com",
    messagingSenderId: "198120277156",
    appId: "1:198120277156:web:71c8b5a06f321126995231",
    measurementId: "G-1GHK78GQFM"
  }
  ////  LearnWithMe application
  //    >>>>> TEST ONLY  <<<<<
  // firebaseConfig: {
  //   apiKey: "AIzaSyDdO6sY1r4GrG5Wk0BiSV6RiwH-kRmlQSY",
  //   authDomain: "learnwithme-d7e6f.firebaseapp.com",
  //   databaseURL: "https://learnwithme-d7e6f.firebaseio.com",
  //   projectId: "learnwithme-d7e6f",
  //   storageBucket: "learnwithme-d7e6f.appspot.com",
  //   messagingSenderId: "871958216338",
  //   appId: "1:871958216338:web:4c3b398e85552a14aff04b",
  //   measurementId: "G-TS0P3139V2"
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
