import { QueryList, Injectable, DoCheck,ContentChild, ContentChildren, Directive, Component, ElementRef, AfterViewInit } from '@angular/core';
import { ExtBaseComponent } from './extbase'

@Injectable()
export class ExtEvent extends ExtBaseComponent {
    // constructor(element: ElementRef) {
    //     super(element);
    // }
}

@Directive({ selector: 'ext:StoreParameter' })
export class StoreParameter {

    constructor(private element: ElementRef) {

    }

    public get props(): any {
        return this.element.nativeElement.attributes;
    }
}

@Directive({ selector: 'ExtraParams' })
export class ExtraParams {
    @ContentChildren(StoreParameter) storeParameters: QueryList<StoreParameter>;
}


@Directive({ selector: 'Click' })
export class ClickEvent extends ExtEvent implements AfterViewInit,DoCheck {

    @ContentChild(ExtraParams) extraParams: ExtraParams;
    constructor(private element: ElementRef) {
        super();
    }

    ngAfterViewInit() {

    }

    public get props(): any {
        return this.element.nativeElement.attributes;
    }

    ngDoCheck() {
        console.log(this.extraParams);
    }
    public getUrlParameterString(parentComponent:any) {
        let paramString = '';
        if (this.extraParams.storeParameters) {
            this.extraParams.storeParameters.toArray().forEach(param => {
                const funcName=param.props.Value.value.replace('App.','').replace('()','');
                const paramValue= parentComponent[funcName]();
                paramString+=param.props.Name.value+'='+paramValue;
            });
        }
        console.log(paramString);
        return paramString;
    }
}


@Directive({ selector: 'Listeners' })
export class ListenersComponent {
    @ContentChild(ClickEvent) clickEvent: ClickEvent;
    /* and so on */

}

