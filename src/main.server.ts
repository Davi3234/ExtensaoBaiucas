import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    { provide: BrowserAnimationsModule, useClass: BrowserAnimationsModule }
  ]
});

export default bootstrap;
