import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef, Input
} from '@angular/core';
import { Store } from './store.component';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

@Component({
  selector: 'ext:ComboBox',

  template: `
    <ng-content></ng-content>
    <div *ngIf="this.items && this.items.length > 0 && enableCombo" >
        <p-dropdown [options]="this.items" [(ngModel)]="action" [filter]="true"></p-dropdown>
    </div>`
})


export class ComboBoxComponent implements OnInit {
  enableCombo: boolean = true;
  _store: Store;
  private innerElement: any;
  public items: Array<any>;
  selectedValue: string = 'SelectItem';

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
    console.log(element);
    this.items = new Array<ListItem>();
    this.innerElement = document.createElement('div');
    this.innerElement.attributes.value = 'combo';
  }

  ngOnInit() {
    console.log(this.element.nativeElement.innerHTML);
    if (this.props.StoreID && this.props.StoreID.value.length > 0) {
    } else {
      this.addOptions();
    }
    this.cd.markForCheck();
  }

  @Input()
  public get store(): Store {
    return this._store;
  }

  public get action(): string {
    return this.selectedValue;
  }

  public set action(newValue: string) {
    this.selectedValue = newValue;
  }

  public setValue(newValue: string) {
    this.selectedValue = newValue;
  }
   public getValue() {
    return this.selectedValue;
  }

  public set store(newValue: Store) {
    this._store = newValue;

    if (this.items.length === 0) {
      this._store.data.items.forEach(item => {
        this.items.push(new ListItem(item[this.props.DisplayField.value], item));
      });
    }
  }

  public get props(): any {
    return this.element.nativeElement.attributes;
  }

  private addOptions() {
    let listItems = this.element.nativeElement.querySelectorAll('ListItem');
    if (listItems) {
      listItems.forEach(element => {
        this.items.push(new ListItem(element.attributes.Text.value, element.attributes.Value.value));
      });
    }
  }
}
