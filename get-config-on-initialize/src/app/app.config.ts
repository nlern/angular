import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AppConfig {

  private config: Object = null;
  private env: Object = null;

  constructor(private http: HttpClient) { }

  /**
   * GetConfig
   * @description Use to get data found in second file (config file)
   * @param key key to get
   */
  public GetConfig(key: any) {
    return this.config[key];
  }

  /**
   * GetEnv
   * @description Use to get data found in first file (env file)
   * @param key env to get
   */
  public GetEnv(key: any) {
    return this.env[key];
  }

  /**
   * Load
   * @description This method:
   *   * Loads `env.json` to get the current working environment
   * (e.g.: *production*, *development*)
   *   * Loads `config.[env].json` to get all env's variables
   * (e.g.: *config.development.json*)
   */
  public Load() {
    return new Promise((resolve, reject) => {
      this.http.get('env.json')
        .pipe(
          // map( (res: any) => {
          //   console.log(res);
          //   return res.json();
          // }),
          catchError((error: HttpErrorResponse): any => {
            console.log('Configuration file "env.json" could not be read');
            resolve(true);
            return throwError(error.message || 'Server error');
          })
        )
        .subscribe((envResponse: {'env': string}) => {
          this.env = envResponse;
          let request: Observable<any> = null;

          switch (envResponse.env) {
            case 'prod':
            case 'dev':
            case 'qa': {
              request = this.http.get(`config.${envResponse.env}.json`);
            } break;
            default: {
              console.error('Environment file is not set or invalid');
              resolve(true);
            } break;
          }

          if (request) {
            request
              .pipe(
                // .map( res => res.json() ),
                catchError((error: HttpErrorResponse) => {
                  console.error(`Error reading ${envResponse.env} configuration file`);
                  resolve(error);
                  return throwError(error.message || 'Server error');
                })
              )
              .subscribe((responseData) => {
                this.config = responseData;
                resolve(true);
            });
          } else {
            console.error('Env config file "env.json" is not valid');
            resolve(true);
          }
        });
    });
  }
}
