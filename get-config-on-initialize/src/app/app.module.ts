import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// app config related
import { APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.Load();
}

// modules
import { ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { OrderSheetComponent } from './counter/order-sheet/order-sheet.component';
import { DebugPanelComponent } from './counter/debug-panel/debug-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderSheetComponent,
    DebugPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
