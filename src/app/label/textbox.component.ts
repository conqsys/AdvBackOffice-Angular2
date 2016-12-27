import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';

@Component({
  selector: 'ext:TextField',
  template: `<ng-content></ng-content> <input pInputText type="text" [(ngModel)]="textBoxContent" 
    (blur)="blurEventHandler()" placeholder="Type your name"> `,
})

export class TextBoxComponent implements AfterViewInit, DoCheck {

  @ContentChild(ListenersComponent) listeners: ListenersComponent;
  listenerElement: any;
  myParent: any;
  textBoxContent: string = '';
  ID: any;
  constructor(private element: ElementRef,
    private cd: ChangeDetectorRef,
    private vcRef: ViewContainerRef) {
    this.myParent = (<any>this.vcRef.injector)._view.context;
  }
  ngAfterViewInit() {
    this.listenerElement = this.element.nativeElement.querySelector('Listeners');

  }
  public get props(): any {
    return this.element.nativeElement.attributes;
  }

  public get textboxValue(): string {
    return this.textBoxContent;
  }

  public set textboxValue(newValue: string) {
    this.textBoxContent = newValue;
  }
  public getValue() {
    return this.textboxValue;
  }

  public setValue(newValue: string) {
    this.textBoxContent = newValue;
  }

  blurEventHandler(element) {
    let elements: any;
    if (this.listenerElement.querySelector('Blur')) {
      elements = this.listenerElement.querySelector('Blur');
    } else if (this.listenerElement.querySelector('KeyDown')) {
      elements = this.listenerElement.querySelector('KeyDown');
    } else if (this.listenerElement.querySelector('Click')) {
      elements = this.listenerElement.querySelector('Click');
    }
    this.ID = this.element.nativeElement.attributes.ID.value;
    if (elements) {
      if (elements.attributes.Fn) {
        this.myParent[elements.attributes.Fn.value]();

      } else {
        // console.log('no click handler for' + this.props.Text.value);
      }
    }
  }

  ngDoCheck() {
    // console.log(this.listeners);
  }
}
