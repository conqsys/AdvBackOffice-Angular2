// declare var $:JQueryStatic;
import {
  Injectable,
  ViewContainerRef
} from '@angular/core';
// import { CommonService } from './common.service';
// import { Http, Response, URLSearchParams, Headers } from '@angular/http';
@Injectable()
export class Store {

  public key: string;
  public data: StoreData = new StoreData();

  public myParent: any;
  storeElement: any;
  vcRef: ViewContainerRef;
  public commonService: any;
  private apiServiceBase: string = 'http://localhost:13505/';
  constructor() {
  }

  public static getAllStores(element: any, myParent: any, service: any): Store[] {

    let elements = element.querySelectorAll('Store');

    let stores = new Array<Store>();
    for (let i = 0; i < elements.length; i++) {
      let store = Store.CreateStoreForElement(elements[i]);
      store.myParent = myParent;
      store.storeElement = element;
      store.commonService = service;;
      stores.push(store);
    }
    return stores;
  }

  public static CreateStoreForElement(element: any): Store {
    let store = new Store();
    store.key = element.attributes.ID.value;
    return store;
  }

  callService() {
    let urlElement = this.storeElement.querySelector('AjaxProxy');
    let url = '';
    let callToService = '';
    if (urlElement) {
      url = urlElement.attributes.Url.value;
      if (urlElement.attributes.Url) {
        let parameters = this.storeElement.querySelector('Parameters');
        if (parameters) {
          callToService = url + '?' +
            this.getUrlParameterString(this.myParent, parameters);
          console.log(callToService);

        } else {
          callToService = url;
        }
        this.commonService.getDataFromURL(callToService).subscribe(result => {
          this.data.items = result;
          let listeners = this.storeElement.querySelector('Listeners');
          if (listeners) {
            let loadEvent = this.storeElement.querySelector('Load');
            if (loadEvent) {
              let event = '';
              if (loadEvent.attributes.Handler && loadEvent.attributes.Handler.value.indexOf('App.') !== -1) {
                event = loadEvent.attributes.Handler.value.replace('App.', 'this.App.');
                eval(event).call(this.myParent);
              } else {
                this.myParent[loadEvent.attributes.Fn]();
              }
            }
          }
          // alert(result);
        });
      }
    }
  }

  getUrlParameterString(parentComponent: any, parameters: any) {
    let paramString = '';
    const storeParameters = parameters.querySelectorAll('StoreParameter');

    if (storeParameters) {
      storeParameters.forEach(param => {
        let funcName = '';
        let paramValue = '';
        if (param.attributes.Value.value.indexOf('(') !== -1 && param.attributes.Value.value.indexOf(')') !== -1) {
          funcName = param.attributes.Value.value.replace('App.', 'this.App.'); // .replace('()', '');
          // var a='updateBulkStoreItem';
          // paramValue = parentComponent[funcName]();
          paramValue = function () { return eval(funcName); }.call(parentComponent);
          // paramValue='458';
        } else {
          paramValue = param.attributes.Value.value;
        }
        // paramValue
        paramString += param.attributes.Name.value + '=' + paramValue;
      });
    }
    console.log(paramString);
    return paramString;
  }

  public getFieldValue(rowIndex: number, fieldName: string) {
    let item = this.data.items[rowIndex];
    return Object.getOwnPropertyDescriptor(item, fieldName).value;
  }
}

export class StoreData {
  public items: Array<any> = new Array<any>();
  constructor() {
  }
  public get length(): number {
    return this.items.length;
  }
}
