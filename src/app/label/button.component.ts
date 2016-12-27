import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';
@Component({
    selector: 'ext:Button',
    template: `<ng-content></ng-content> <button (click)="onClickHandler($event)">{{props.Text.value}}test</button>`,
})
export class ButtonComponent implements AfterViewInit, DoCheck {


    @ContentChild(ListenersComponent) listeners: ListenersComponent;

    myParent: any;
    constructor(private element: ElementRef, private cd: ChangeDetectorRef
        , private vcRef: ViewContainerRef
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
                this.myParent[this.listeners.clickEvent.props.Fn.value]();
            } else if (this.listeners.clickEvent.props.Url) {
                this.callService();
            }
        } else {
            console.log('no click handler for' + this.props.Text.value);
        }
    }

    private callService() {
        const callToService=this.listeners.clickEvent.props.Url.value+"/"+
        this.listeners.clickEvent.getUrlParameterString(this.myParent);
        console.log(callToService);
    }
    ngDoCheck() {
        console.log(this.listeners);
    }

    ngAfterViewInit() {    
    }
}