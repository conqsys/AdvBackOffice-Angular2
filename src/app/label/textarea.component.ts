import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';

@Component({
  selector: 'ext:TextArea',
  template: `<ng-content></ng-content> <textarea pInputText  [ngModel]="textAreaValue" 
    placeholder="Type your name" (click)="clickEventHandler($event)"></textarea>
 
    `,
})

export class TextAreaComponent implements AfterViewInit, DoCheck {

  @ContentChild(ListenersComponent) listeners: ListenersComponent;
  listenerElement: any;
  myParent: any;
  textAreaContent: string = '';
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

  public get textAreaValue(): string {
    return this.textAreaContent;
  }

  public set textAreaValue(newValue: string) {
    this.textAreaContent = newValue;
  }
  public getValue() {
    return this.textAreaValue;
  }

  public setValue(newValue: string) {
    this.textAreaContent = newValue;
  }

   public getRawValue(){
     return this.textAreaValue;
  }


  clickEventHandler(element) {
    let elements: any;
    if (this.listenerElement.querySelector('KeyDown')) {
      elements = this.listenerElement.querySelector('KeyDown');
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
    console.log(this.listeners);
  }
}
