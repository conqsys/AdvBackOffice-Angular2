import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'Rxjs/Rx';
import 'rxjs/Rx';
@Injectable()

export class CommonService {
  constructor(private http: Http) {

  }

  private apiServiceBase: string = 'http://192.168.1.183:8081/';

  public getDataFromURL (url: any) {

    console.log('hiiiii test APi');
    // return this.http
    //   .get(this.apiServiceBase + url)
    //   .map(
    //   (res: Response) =>
    //     res.json()
    //   );
    return 's';
  };


  public upload() {
    return this.http
      .get(this.apiServiceBase + 'upload')
      .map(
      (res: Response) =>
        res.json()
      );
  }

}
