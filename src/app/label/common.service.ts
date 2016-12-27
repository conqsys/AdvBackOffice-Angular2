import { Http, Response, URLSearchParams,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'Rxjs/Rx';
import 'rxjs/Rx';
@Injectable()

export class CommonService {
  constructor(private http: Http) {

  }

  private apiServiceBase: string = 'http://localhost:8081';
  public getDataFromURL = function (url) {
    return this.http
      .get(this.apiServiceBase + url)
      .map(
        (res: Response) => 
        res.json()
        );
  }

 

}
