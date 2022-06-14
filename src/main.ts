import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'ag-grid-enterprise';

//import { ModuleRegistry } from '@ag-grid-community/core';
//import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

if (environment.production) {
  enableProdMode();
}

//ModuleRegistry.registerModules(ServerSideRowModelModule);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
