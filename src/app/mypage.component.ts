// import { AppComponent } from './';

import {
  DoCheck, OnInit, Component, ElementRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { Store } from './label/store.component';
import { AppController } from './label/app-controller';
import { ComboBoxComponent } from './label/combobox.component';
import { DateFieldComponent } from './label/date-field.component';
import { LinkButtonComponent } from './label/linkButton.component';
import { CommonService } from './label/common.service';
import { SelectItem } from 'primeng/primeng';
import { NumberComponent } from './label/number.component';
import { TextBoxComponent } from './label/textbox.component';
import { CheckboxComponent } from './label/checkbox.component';

@Component({
  selector: 'mypage',
  templateUrl: './mypage.component.html'
})

export class MyPageComponent implements DoCheck, OnInit, AfterViewInit {

  @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  @ViewChildren(DateFieldComponent) dateFields: QueryList<DateFieldComponent>;
  @ViewChildren(LinkButtonComponent) linkButtons: QueryList<LinkButtonComponent>;
  @ViewChildren(NumberComponent) numberFields: QueryList<NumberComponent>;
  @ViewChildren(TextBoxComponent) textBoxes: QueryList<TextBoxComponent>;
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;

  title = 'AdvBack Office Development';
  app: AppController;
  stores = Store[0];
  check: number = 1;
  myParent: any;
  cities: SelectItem[];
  selectedCity: any;
  App: any = this;
  private checkBoxValue1: boolean;
  private checkBoxValue2: boolean;
  private checkBoxValue3: boolean;
  private checkBoxValue4: boolean;
  private txtData: string = '';

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
  }

  ngAfterViewInit() {
    let self = this;
    if (this.dateFields) {
      this.dateFields.toArray().forEach(comp => {
        console.log('date is' + comp.props.ID.value);
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
        console.log('datda is' + this.App.dpPurchaseRepStartDate);
      });
    }

    if (this.comboBoxes) {
      this.comboBoxes.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }

    if (this.linkButtons) {
      this.linkButtons.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
    if (this.numberFields) {
      this.numberFields.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }

    this.App.NumberField4.setValue(2.6);

    if (this.textBoxes) {
      this.textBoxes.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }

    if (this.checkBoxes) {
      this.checkBoxes.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
  }

  ngDoCheck() { }

  doSomeThing() { }

  public getValue() { }

  public setValue() {
    this.App.cmbStoreLocationFixed.setValue('IsItemReturnableFlag');
    this.App.dpPurchaseRepStartDate.setValue('12-01-2016');
  }

  public Show() {
    let enableProperty = this.App.cmbStoreLocationFixed.enableCombo;
    if (enableProperty) {
      this.App.cmbStoreLocationFixed.enableCombo = false;
    } else {
      this.App.cmbStoreLocationFixed.enableCombo = true;
    }
  }

  public comboApiCall() {
    let url = this.App.cmbmoveDepartment.element.nativeElement
      .querySelectorAll('DirectEvents')[0]
      .querySelectorAll('Select')[0]
      .attributes[0].nodeValue;

    // url call API

    this.commonService
      .getDataFromURL(url)
      .then(result => {
        alert('redirect path is done');
      });
  }

  updateBulkStoreItem() {
    alert('wow');
  }

  showEmployeeSetupWindow() {
    console.log('testing link button');
  }

  private applyCompaniesSearchFilter() {
    alert('Hi');
  }

  getMeParamValue() {
    return 'xyz';
  }

  numberFieldShow() {
    alert('numberFieldShow');
  }
  numberFieldBlur() {
    alert('numberFieldBlur');
  }
  numberFieldClick() {
    alert('numberFieldClick');
  }

  setTextBoxValue() {
    this.App.TextField3.setValue('Hi Deepak!');
  }

  getTextBoxValue() {
    this.txtData = this.App.TextField3.getValue();
  }

  getCheckBoxValue() {
    // alert(this.App.chkShowLocation3);
    this.checkBoxValue1 = this.App.chkShowLocation1.getValue()
    this.checkBoxValue2 = this.App.chkShowLocation2.getValue()
    this.checkBoxValue3 = this.App.chkShowLocation3.getValue()
    this.checkBoxValue4 = this.App.chkShowLocation4.getValue()
  }

  setCheckBoxValue() {
    this.App.chkShowLocation1.setValue(1)
    this.App.chkShowLocation1.setValue(1)
  }

}
