import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';

@Component({
  selector: 'ext:TextField',
  template: `<ng-content></ng-content> <input type="text" [ngModel]="textBoxContent" 
    placeholder="Type your name" (ngModelChange)="valuechange($event)"/>`,
})

export class TextBoxComponent implements AfterViewInit, DoCheck {


  @ContentChild(ListenersComponent) listeners: ListenersComponent;
  listenerElement: any;
  myParent: any;
  textBoxContent: string = '';

  constructor(private element: ElementRef, private cd: ChangeDetectorRef
    , private vcRef: ViewContainerRef
  ) {
    this.myParent = (<any>this.vcRef.injector)._view.context;
  }

  public get props(): any {
    return this.element.nativeElement.attributes;
  }

  valuechange(event) {
    const clickEvent = this.listenerElement.querySelector('KeyDown');
    if (clickEvent) {
      if (clickEvent.attributes.Fn) {
        this.myParent[clickEvent.attributes.Fn.value]();
      } else if (clickEvent.attributes.Url) {
        this.callService(clickEvent);
      }
    } else {
      console.log('no click handler for' + this.props.Text.value);
    }
  }

  private callService(clickEvent: any) {
    const callToService = clickEvent.attributes.Url.value + '/' +
      this.getUrlParameterString(this.myParent, clickEvent);
    console.log(callToService);
  }

  ngDoCheck() {
  }

  ngAfterViewInit() {
    this.listenerElement = this.element.nativeElement.querySelector('Listeners');
    // this.listeners.items.first.props.fn
  }

  public getUrlParameterString(parentComponent: any, clickEvent: any) {
    let paramString = '';
    const extraParams = clickEvent.querySelector('ExtraParams');
    const storeParameters = extraParams.querySelectorAll('StoreParameter');
    if (extraParams) {
      if (storeParameters) {
        storeParameters.forEach(param => {
          const funcName = param.attributes.Value.value.replace('App.', '').replace('()', '');
          const paramValue = parentComponent[funcName]();
          paramString += param.attributes.Name.value + '=' + paramValue;
        });
      }
    }

    return paramString;
  }
}
