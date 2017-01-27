import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'Rxjs/Rx';
import 'rxjs/Rx';
@Injectable()

export class CommonService {
  constructor(private http: Http) {

  }

  private apiServiceBase: string = 'http://192.168.1.183:8081';


  public upload() {
    return this.http
      .get(this.apiServiceBase + 'upload')
      .map(
      (res: Response) =>
        res.json()
      );
  }
  public getDataFromURL(url) {
    return this.http
      .get(this.apiServiceBase + url)
      .map(
      (res: Response) =>
        res.json()
      );
  }

  public saveDepartment(departmentObj) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiServiceBase + '/saveDepartment', JSON.stringify(departmentObj), options)
      .toPromise()
      .then(res => res.json());
    };
}
