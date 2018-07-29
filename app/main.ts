/**
 * Created by Vincent Ma on 8/24/16.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: Error) => console.error(err));
