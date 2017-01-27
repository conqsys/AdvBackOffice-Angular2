import {
  DoCheck,
  OnInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

import { Store } from '../label/store.component';
import { ComboBoxComponent } from '../label/combobox.component';
import { TextBoxComponent } from '../label/textbox.component';
import { CheckboxComponent } from '../label/checkbox.component';
import { CommonService } from '../label/common.service';
import { FormPanelComponent } from '../label/form-panel.component';

@Component({
  selector: 'department-detail',
  templateUrl: './department-detail.component.html'
})

export class DepartmentDetailComponent implements DoCheck, OnInit, AfterViewInit {
  @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChildren(TextBoxComponent) textBoxs: QueryList<TextBoxComponent>;
  @ViewChildren(FormPanelComponent) formPanels: QueryList<TextBoxComponent>;

  stores = Store[0];
  App: any = this;
  isSaveCloseClick: boolean = false;
  check: number = 1;

  count: number = 0;
  // declare it for test perpose
  isNewDepartmentSource: boolean;
  depID: number = 0;
  selIndex: number = 0;
  isDepNext: boolean = false;
  isDepPrev: boolean = false;
  currentRecord: number = 1;
  totalRecord: number = 0;
  activetabdep: string = '';
  isNextorPrevClickdep: boolean = false;
  depRowindex: number = 0;
  isDepLocationNextPrev: boolean = true; // var to check department location tab on next click
  isDepChartNextPrev: boolean = true;    // var to check department chart tab on next previous click
  chartname: string = 'Column';

  constructor(private element: ElementRef,
    private commonService: CommonService) {

  }
  ngOnInit() {
  }

  ngAfterViewInit() {

    let self = this;
    this.stores = Store.getAllStores(this.element.nativeElement, this, this.commonService);
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

    this.stores.forEach(store => {
      Object.defineProperty(self, store.key, {
        writable: true,
        enumerable: true,
        configurable: true,
        value: store
      });

    });
    this.stores.forEach(store => {
      store.callService();
    });
    this.getDefauldTextboxValue();
    this.getDefaultCheckBoxValue();
    this.getDefaultFormDetail();
  }

  ngDoCheck() {
    if (this.comboBoxes) {
      this.stores.forEach(store => {
        const combo = this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value === store.key)[0];
        if (combo) {
          combo.store = store;
          console.log('test store');
        }
      });
    }

  }

  public saveDepartmentForm(): boolean {
    if (this.App.txtDepDesc.getValue() === '' || this.App.txtDepDesc.getValue() === null) {
      this.isSaveCloseClick = false;
      return false;
    }

    this.App.dsDepartmentHeader.data.items[0].data.DisplayPromptMethodID = this.App.cmbDisPromptMethod.getValue();
    this.App.dsDepartmentHeader.data.items[0].data.DepartmentTypeID = this.App.cmbDepTypesA.getValue();
    // this.App.dsDepartmentHeader.save();
    if (this.isSaveCloseClick === true) {
    }
    let arr = this.App.dsDepartmentHeader.data.items[0].data;
    this.commonService.saveDepartment
      (arr).then();
  }

  public saveCloseDepartmentForm() {
    this.isSaveCloseClick = true;
    this.saveDepartmentForm();
  }

  public showMoveDepartmentWindow() {

  }

  public getDepIDBySelectedIndex(object): number {

    if (this.isNewDepartmentSource === false) {
      if (this.isDepNext === false && this.isDepPrev === false) {
        if (this.App.grdDepartments.selModel.lastSelected != null) {
          this.selIndex = this.depRowindex;
        }
        if (this.App.dsDepartments.data.items.length > 0 && this.isSaveCloseClick === false) {
          if (this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID !== 0) {
            this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
          }
        }

      } else if (this.isDepNext === true) {
        this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
      } else if (this.isDepPrev === true) {
        this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
      }
      this.App.lblCurrentRecord.setText(1 + this.selIndex + ' - ');
      this.totalRecord = this.App.dsDepartments.getCount();
    }
    return this.depID;

  }


  // load the selected department record on department detail form
  public departmentLoaded(store, records) {
    this.isSaveCloseClick = false;
    if (this.isNextorPrevClickdep === true) {
    }

    if (records != null && records.length > 0) {
      let recordToLoad = this.App.dsDepartmentHeader.data.items[0];

      if (recordToLoad != null) {

        // add case of department

        if (records[0].data.DepartmentID === 0) {

          this.App.dsDepartmentHeader.data.items[0].newRecord = true;

          this.App.lblHeaderAdd.show();
          this.App.lblHeaderAdd.setText('Add a New Department');
          this.App.btnMoveDepartment.hide();
          document.getElementById('DepartmentTitle').style.display = 'none';
          document.getElementById('prevNextDepDiv').style.display = 'none';
          this.App.lnkPrevious.hide();
          this.App.lnkNext.hide();


        } else {
          // edit case of department
          if (recordToLoad.data != null) {
          }
        }


        this.App.cmbDepTypesA.setValue(recordToLoad.data.DepartmentTypeID);
        this.App.cmbDisPromptMethod.setValue(recordToLoad.data.DisplayPromptMethodID);
        this.App.DepartmentFormPanel.loadRecord(recordToLoad);

        this.App.txtMinSaleAmount.setValue(this.App.txtMinSaleAmount.getRawValue());
        this.App.txtMaxSaleAmount.setValue(this.App.txtMaxSaleAmount.getRawValue());

        if (records[0].data.DepartmentID === 0) {
          this.App.chkIsDepartmentOpen.setValue(true);
          this.App.chkActiveFlag.setValue(true);
          this.App.chkIsDepartmentNegative.setVisible(false);
        } else {
          this.App.chkActiveFlag.setValue(recordToLoad.data.ActiveFlag);
          this.App.chkIsDepartmentOpen.setValue(recordToLoad.data.IsDepartmentOpen);
          this.App.chkIsFractionalQtyAllowedFlag.setValue(recordToLoad.data.IsFractionalQtyAllowedFlag);
          this.App.chkIsLoyaltyRedeemEligibleFlag.setValue(recordToLoad.data.IsLoyaltyRedeemEligibleFlag);
          this.App.chkIsItemReturnableFlag.setValue(recordToLoad.data.IsItemReturnableFlag);
          this.App.chkAllowFoodStampsFlag.setValue(recordToLoad.data.AllowFoodStampsFlag);
        }
      }
    }
  };
  private getDefauldTextboxValue(): void {
    if (this.textBoxs) {
      let self = this;
      this.textBoxs.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
  }
  public getDefaultCheckBoxValue(): void {
    if (this.checkBoxes) {
      let self = this;
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

  public getDefaultFormDetail(): void {
    if (this.formPanels) {
      let self = this;
      this.formPanels.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
  }

  doSomeThing() {
  }

  getDefaultRadioButtonsValue(): void {
  }

  // radio click
  getClockOutValue() {
  }

  updateBulkStoreItem() {
    alert('wow');
  }

  private applyCompaniesSearchFilter() {
    alert('Hi');
  }

  getMeParamValue() {
    return 'xyz';
  }
}
