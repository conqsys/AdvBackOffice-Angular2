import { ContentChild, DoCheck, ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ListenersComponent } from './listeners';
@Component({
    selector: 'ext:Radio',
    template: `<ng-content></ng-content><label >{{tooltipMsg}}</label>  
       <p-radioButton name="groupname" value="true" [(ngModel)]="radioButtonContent"
        (ngModelChange)="onClickHandler()"></p-radioButton>{{radioValue}}
      `,
})
export class RadioComponent implements AfterViewInit {


    @ContentChild(ListenersComponent) listeners: ListenersComponent;
    public listenerElement: any;
    public tooltipListner: any;
    public parentComponent: any;
    public fieldLabel: string;
    public id: string;
    public checked: string;
    tooltipMsg: string;
    selectedRadioValue: boolean = false;
    radioButtonContent: string = (this.selectedRadioValue == true) ? "true" : "false";
    isShow: boolean = true;
    constructor(private element: ElementRef, private cd: ChangeDetectorRef
        , private vcRef: ViewContainerRef
    ) {
        console.log(element);
        this.parentComponent = (<any>this.vcRef.injector)._view.context;

        console.log(this.parentComponent);
    }

    public get props(): any {

        return this.element.nativeElement.attributes;
    }

    public get getRadioButtonValue(): boolean {
        return this.selectedRadioValue;
    }

    public set getRadioButtonValue(newValue: boolean) {
        this.selectedRadioValue = newValue;
        this.radioButtonContent=(this.selectedRadioValue == true) ? "true" : "false";
    }
    public getValue() {
        return this.getRadioButtonValue;
    }
    public setValue(setData) {
       this.getRadioButtonValue = setData;
    }
    public hide() {
        this.isShow = false;
    }
    public show() {
        this.isShow = true;
    }

    public getRawValue() {

        return this.getRadioButtonValue;
    }

    onClickHandler(event) {
        //   console.log(this.value);
        this.getRadioButtonValue = true;
        const clickEvent = this.listenerElement.querySelector('Change');
        if (clickEvent) {
            if (clickEvent.attributes.Fn) {
                this.parentComponent[clickEvent.attributes.Fn.value]();
            } else if (clickEvent.attributes.Handler) {
                // this.callService(clickEvent);
            }
        } else {
            console.log('no click handler for' + this.props.Text.value);
        }

    }
    ngAfterViewInit() {
        this.listenerElement = this.element.nativeElement.querySelector('Listeners');
        // add tooltip plugin   
        this.tooltipListner = this.element.nativeElement.querySelector('ToolTips');
        if (this.tooltipListner) {
            this.tooltipMsg = this.element.nativeElement.querySelector('ToolTips').querySelector('Tooltip').attributes.Html.value;
            // const clickEvent = this.tooltipListner.querySelector('ext:ToolTip');
            //    console.log(clickEvent.attributes.ID.value);
        }
        this.fieldLabel = this.element.nativeElement.attributes.FieldLabel.value;
        this.id = this.element.nativeElement.attributes.ID.value;
        if (this.element.nativeElement.attributes.Checked !== undefined) {
            this.checked = this.element.nativeElement.attributes.Checked.value;
        } else {
            this.checked = "";
        }

    }
    // tslint:disable-next-line:eofline
}