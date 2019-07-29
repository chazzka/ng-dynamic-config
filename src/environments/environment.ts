// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const applicationNames = {
  mapper: "MAPPER",
  mockUserName: "ffff",
  mockVersion: "123456"
}

export const environment = {
  production: false,
  completePrivilegesUrl: 'http://agata.onsemi.com:60071/dynamic-configuration-business/api/privileges/complete?applicationName=' + applicationNames.mapper,
  importPrivilegesUrl: `http://agata.onsemi.com:60071/dynamic-configuration-business/api/privileges/import?userName=${applicationNames.mockUserName}+&version=${applicationNames.mockVersion}`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
