import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';
import { CommonService } from '../label/common.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'ext:LinkButton',
  template: `<ng-content></ng-content> 
    <button pButton class="ui-button-success" (click)="onClickHandler($event)" label = {{props.Text.value}}></button>`,
})

export class LinkButtonComponent implements AfterViewInit, DoCheck {
  directEvents: any;
  @ContentChild(ListenersComponent) listeners: ListenersComponent;
  myParent: any;
  click: any;
  extraParams: any;
  eventMask: any;
  customTarget: any;
  btnEmployeeSetupPopWindowUrl: string;
  getValue: string;
  getData: any;
  constructor(private element: ElementRef,
    private cd: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private commonService: CommonService
  ) {
    console.log(element);
    this.myParent = (<any>this.vcRef.injector)._view.context;
    console.log(this.myParent);
  }

  public get props(): any {
    return this.element.nativeElement.attributes;
  }


  onClickHandler(event) {
    if (this.listeners.clickEvent) {
      if (this.listeners.clickEvent.props.Fn) {
        this.getValue = this.myParent[this.listeners.clickEvent.props.Fn.value]();
      }
      if (this.directEvents) {
        this.btnEmployeeSetupPopWindowUrl = this.element.nativeElement
          .querySelector('directEvents')
          .querySelector('click').attributes.Url.value;

        this.getData = this.commonService
          .getDataFromURL(this.btnEmployeeSetupPopWindowUrl)
        // .then(result => 
        alert(this.getData);
      }
    } else {
      console.log('no click handler for' + this.props.Text.value);
    }
  }

  private callService() {
    const callToService = this.listeners.clickEvent.props.Url.value + '/' +
      this.listeners.clickEvent.getUrlParameterString(this.myParent);
    console.log(callToService);
  }


  ngDoCheck() {
    console.log(this.listeners);
  }

  ngAfterViewInit() {
    this.directEvents = this.element.nativeElement.querySelector('DirectEvents');
    if (this.directEvents) {
      this.click = this.directEvents.querySelector('click');
      if (this.click) {
        this.eventMask = this.click.querySelector('EventMask');
        if (this.eventMask) {
          this.customTarget = this.eventMask.attributes[0].value;
        }
      }
    }
  }
}
