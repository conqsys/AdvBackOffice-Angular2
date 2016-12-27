import {
    EventEmitter, Component, ElementRef, TemplateRef, ViewContainerRef, Compiler, OnInit, DoCheck,
    ChangeDetectorRef, Input
} from '@angular/core';
import { Store } from './store.component';
export class ListItem {
    constructor(public label: string, public value: any) { }
}

@Component({
    selector: 'ext:ComboBox',

    template: `<ng-content></ng-content>

 <h1>Store Dropdown</h1>
            <select *ngIf="this.items && this.items.length>0" [ngStyle]="{'width':props.Width.value+'px'}">
                 
                 <option *ngFor='let item of this.items' value='{{item.value}}'> {{item.label}}
                  </option>                 
                </select>
<div  *ngIf="this.items && this.items.length>0">
<p-dropdown [options]="this.items"  [(ngModel)]="action"></p-dropdown>
</div>

                  <select *ngIf="store" [ngStyle]="{'width':props.Width.value+'px'}">                 
                     <option *ngFor='let item of store.data.items;let i=index' >{{store.getFieldValue(i,props.DisplayField.value)}}
                    </option>                 
                </select>
             
                `,

})


export class ComboBoxComponent implements DoCheck {
    _store: Store;
    action: any;
    constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
        console.log(element);
        this.store = new Store();
        this.items = new Array<ListItem>();
        //   this.items.push(new ListItem("a","b"));
        //         this.items.push(new ListItem("a1","b1"));
        this.innerElement = document.createElement('div');
        this.innerElement.attributes.value = 'combo';
    }

    @Input()
    public get store(): Store {
        return this._store
    }

    public set store(newValue: Store) {
        this._store = newValue;
        this._store.onDataLoaded = new EventEmitter<string>();
        var self=this;
        this._store.onDataLoaded.subscribe((value)=>{
            self.items = [];
            // self._store.data.items.forEach(item => {
            //     self.items.push(new ListItem(item[self.props.DisplayField.value], item));
            // })
        });
        this.onStoreLoadedHandler();
    }

    private onStoreLoadedHandler() {
        this.items = [];
        // this._store.data.items.forEach(item => {
        //     this.items.push(new ListItem(item[this.props.DisplayField.value], item));
        // })
    }

    public get props(): any {
        return this.element.nativeElement.attributes;
    }

    private innerElement: any;
    ngOnInit() {
        console.log(this.element.nativeElement.innerHTML)

        // this.innerElement.innerHTML=this.element.nativeElement.attributes.insideHtml.value;

        if (this.props.StoreID && this.props.StoreID.value.length > 0) {

        } else {
            this.addOptions();
        }

        this.cd.markForCheck();
        //this.innerElement.parentNode.removeChild(this.innerElement);
    }
    ngDoCheck() {


    }
    public items: Array<ListItem>;

    private addOptions() {
        
        let listItems = this.element.nativeElement.querySelectorAll('ListItem');
        if (listItems) {
            listItems.forEach(element => {
                this.items.push(new ListItem(element.attributes.Text.value, element.attributes.Value.value));
                
            })
        }
    }

}
