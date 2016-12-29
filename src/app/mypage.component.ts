// import { AppComponent } from './';

import {
  DoCheck, OnInit, Component, ElementRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { Store } from './label/store.component';
import { AppController } from './label/app-controller';
import { ComboBoxComponent } from './label/combobox.component';
import { DateFieldComponent } from './label/date-field.component';
import { LinkButtonComponent } from './label/linkButton.component';
import { LabelComponent } from './label/label.component';
import { CommonService } from './label/common.service';
import { SelectItem } from 'primeng/primeng';
import { NumberComponent } from './label/number.component';
import { TextBoxComponent } from './label/textbox.component';
import { CheckboxComponent } from './label/checkbox.component';
import { RadioComponent } from './label/radio.component';
import { TextAreaComponent } from './label/textarea.component';


@Component({
  selector: 'mypage',
  templateUrl: './mypage.component.html'
})

export class MyPageComponent implements DoCheck, OnInit, AfterViewInit {

  @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  @ViewChildren(DateFieldComponent) dateFields: QueryList<DateFieldComponent>;
  @ViewChildren(LinkButtonComponent) linkButtons: QueryList<LinkButtonComponent>;
  @ViewChildren(LabelComponent) labels: QueryList<LabelComponent>;
  @ViewChildren(NumberComponent) numberFields: QueryList<NumberComponent>;
  @ViewChildren(TextBoxComponent) textBoxes: QueryList<TextBoxComponent>;
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChildren(RadioComponent) radioButtons: QueryList<RadioComponent>;
  @ViewChildren(TextAreaComponent) textareas: QueryList<TextAreaComponent>;

 title = 'AdvBack Office Development';
  app: AppController;
  stores = Store[0];
  check: number = 1;
  myParent: any;
  cities: SelectItem[];
  selectedCity: any;
  App: any = this;

  getData: any;

  private checkBoxValue1: boolean;
  private checkBoxValue2: boolean;
  private checkBoxValue3: boolean;
  private checkBoxValue4: boolean;
  private txtData: string = '';


  constructor(private element: ElementRef,
    private commonService: CommonService) {
  }

  ngOnInit() {
    // console.log(this.element.nativeElement);
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
    if (this.labels) {
      this.labels.toArray().forEach(comp => {
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

    // this.App.NumberField4.setValue(2.6);

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

     if (this.textareas) {
      this.textareas.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
    // this.getDefaultRadioButtonsValue();

    // this.App.txtDDescription1.setValue('Hii Demo..!!');
  }


  getDefaultRadioButtonsValue(): void {
    if (this.radioButtons) {
      let self = this;
      this.radioButtons.toArray().forEach(comp => {
        Object.defineProperty(self, comp.id, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
      console.log(this.App.rbTimeCardAll);
      this.App.rbTimeCardAll.setValue(true);
    }
  }

  ngDoCheck() { }

  doSomeThing() { }

  public getValue() { }

  public setValue() {
    this.App.cmbStoreLocationFixed.setValue('IsItemReturnableFlag');
    this.App.dpPurchaseRepStartDate.setValue('12-01-2016');
  }

  getClockOutValue() {
    // console.log('call radio button ' + this.App.rbTimeCardAll.getValue());
    // function to call radio component to set value /
    // this.App.rbTimeCardAll.setValue(false);

    // function to show and hide radio button /
    // this.App.rbTimeCardAll.show();
    // this.App.rbTimeCardAll.hide();

    // function for getRawValue /
    // this.App.rbTimeCardAll.getRawValue();
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


 //Number Field Functions
  numberFieldFunction1() {
    alert('numberField');
  }
   numberFieldFunction2() {
   alert('numberField');
  }
  
   numberFieldFunction3() {
    alert('numberField');
  }
  
  
  textBoxFunction() {
    alert('keyDownFunction');
  }

 
  //Set,Get textbox

  setTextBoxValue() {
    this.App.TextField3.setValue('Hi Deepak!');
  }

  getTextBoxValue() {
    this.txtData = this.App.TextField1.getValue();
  }

 //Set,Get Checkbox
  getCheckBoxValue() {
    // alert(this.App.chkShowLocation3);
    this.checkBoxValue1 = this.App.chkShowLocation1.getValue();
    this.checkBoxValue2 = this.App.chkShowLocation2.getValue();
    this.checkBoxValue3 = this.App.chkShowLocation3.getValue();
    this.checkBoxValue4 = this.App.chkShowLocation4.getValue();
  }

  setCheckBoxValue() {

    this.App.chkShowLocation1.setValue(true);    
  }

  checkBoxClick(){
    console.log('ff')

    this.App.chkShowLocation1.setValue(true);
    this.App.chkShowLocation1.setValue(true);
  }

  click() {
    console.log('d');
  }

  setFocusToBuyingCost() {
    alert('textarea');
  }

}
