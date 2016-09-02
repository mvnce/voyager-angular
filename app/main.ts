/**
 * Created by vincentma on 8/24/16.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
