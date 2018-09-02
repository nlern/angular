import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './models/app-config.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable()
export class AppConfig {

  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  public Load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get<IAppConfig>(jsonFile)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            // console.error(`Error reading ${envResponse.env} configuration file`);
            reject(`Could not load file '${jsonFile}': ${error.message}`);
            return throwError(error.message || 'Server error');

          })
        )
        .subscribe((responseData) => {
            AppConfig.settings = responseData;
            resolve();
        });
    });
  }
}
