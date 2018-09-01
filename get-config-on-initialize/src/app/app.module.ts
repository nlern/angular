import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// app config related
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';

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
      useFactory: (config: AppConfig) => () => config.Load(),
      deps: [AppConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
