//declare var $:JQueryStatic;
import {
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    Injectable,
    ReflectiveInjector,
    ViewContainerRef
} from '@angular/core';
import { CommonService } from './common.service';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
@Injectable()
export class Store {

    public key: string;
    public data: StoreData = new StoreData();

    public myParent: any;
    storeElement: any;
    vcRef: ViewContainerRef;
    public commonService: any;
    private apiServiceBase: string = 'http://localhost:13505/';
    public onDataLoaded: EventEmitter<string>;
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
        store.key = element.attributes.ID.value
        return store;
    }

    callService() {
        let urlElement = this.storeElement.querySelector('AjaxProxy')
        let url = '';
        let callToService = '';
        if (urlElement) {
            url = urlElement.attributes.Url.value
            if (urlElement.attributes.Url) {
                let parameters = this.storeElement.querySelector('Parameters')
                if (parameters) {
                    callToService = url + "?" +
                        this.getUrlParameterString(this.myParent, parameters);
                    console.log(callToService);

                } else {
                    callToService = url;
                }
                this.commonService.getDataFromURL(callToService).subscribe(result => {                    
                    this.data.items = result;
                    if(this.onDataLoaded)
                        this.onDataLoaded.emit('LOADED');

                    let listeners = this.storeElement.querySelector('Listeners')
                    if (listeners) {
                        let loadEvent = this.storeElement.querySelector('Load')
                        if (loadEvent) {
                            let event = '';
                            if (loadEvent.attributes.Handler && loadEvent.attributes.Handler.value.indexOf('App.') != -1) {
                                event = loadEvent.attributes.Handler.value.replace('App.', 'this.App.');
                                eval(event).call(this.myParent)
                            }
                            else {
                                this.myParent[loadEvent.attributes.Fn]()
                            }
                        }
                    }
                    alert(result);
                })
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
                if (param.attributes.Value.value.indexOf('(') != -1 && param.attributes.Value.value.indexOf(')') != -1) {
                    funcName = param.attributes.Value.value.replace('App.', 'this.App.');//.replace('()', '');
                    //var a='updateBulkStoreItem';
                    //paramValue = parentComponent[funcName]();
                    paramValue = function () { return eval(funcName) }.call(parentComponent)
                    //paramValue='458';
                } else {
                    paramValue = param.attributes.Value.value;
                }
                //paramValue
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
    public items: List<StoreData> = new List<StoreData>();
    constructor() {
        //this.items[0].
        var collection: DataCollection<StoreData> = {};
        //collection[0].
    }
    public get length(): number {
        return this.items.length;
        
    }

}
class MyType {
    constructor(public someVal: string) {

    }
}

class  DataCollection<T> {   
   
//   ( [index: number]): any {

//    }

//    public b() {
//        return 'x';
//    }
}



export class List<T>  implements IterableIterator<T>
{
    [Symbol.iterator](): IterableIterator<T> {
         return this;
    }

    public next(): IteratorResult<T> {
        return 
    }
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    public get length(): number {
        return this.items.length;
    }
}