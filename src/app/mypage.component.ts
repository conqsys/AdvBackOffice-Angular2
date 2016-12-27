import { AppComponent } from './';
import {
  DoCheck, AfterViewInit, OnInit, Component, ViewContainerRef, ElementRef, TemplateRef, EventEmitter, Injectable,
  ViewChildren, ViewChild, QueryList
} from '@angular/core';
import { Store } from './label/store.component';
import { AppController } from './label/app-controller';
import { ComboBoxComponent } from './label/combobox.component';
import { CommonService } from './label/common.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'mypage',
  templateUrl: './mypage.component.html'
})

export class MyPageComponent implements DoCheck, OnInit, AfterViewInit {
  @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  //cmbStoreLocation: ComboBoxComponent;
  title = 'app works!';
  app: AppController;
  stores = Store[0];
  check: number = 1;
  myParent: any;
  cities: SelectItem[];
  selectedCity: any;
  App: any = this;
  constructor(private element: ElementRef,
    private commonService: CommonService) {

  }
  ngOnInit() {
    console.log(this.element.nativeElement);
    this.cities = [];
    this.cities.push({ label: 'Select City', value: null });
    this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
    this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
    this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
    this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
    this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
    //  this.app = new AppController(this.element.nativeElement, this)
  }
  ngAfterViewInit() {
        if (this.comboBoxes && this.check == 1) {
      //this.cmbStoreLocation = this.comboBoxes.toArray().filter(i => i.props.ID.value == 'cmbStoreLocation')[0];
      this.stores = Store.getAllStores(this.element.nativeElement, this.myParent, this.commonService);
      let self = this;
      this.check = 0;
      this.comboBoxes.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });


      alert(this.App.cmbStoreLocation);

      this.stores.forEach(store => {
        Object.defineProperty(self, store.key, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: store
        });

      })

      this.stores.forEach(store => {
        store.callService();
      })
      //this.App.dsStoreLocation
    }


    if (this.comboBoxes) {
      this.stores.forEach(store => {
        const combo = this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value == store.key)[0];
        if (combo) {
          combo.store = store;
        }
      })
    }

  }

  setStoreData(storeID:String){
    const store= this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value == store.key)[0];
    const combo = this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value == store.key)[0];
        if (combo) {
          combo.store = store;
        }
  }

  ngDoCheck() {



  }

  doSomeThing() {
    this.App.dsDepartmentTypes.data.items[0].data.DepartmentID
  }

  updateBulkStoreItem() {
    alert('wow');
  }

  getMeParamValue() {
    return 'xyz';
  }
}