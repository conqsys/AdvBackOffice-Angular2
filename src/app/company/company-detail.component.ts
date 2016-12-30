
import {
  Component, AfterViewInit,
  ElementRef, ViewChildren,
  QueryList, DoCheck
} from '@angular/core';
import { Store } from '../label/store.component';
import { CommonService } from '../label/common.service';

import { ComboBoxComponent } from '../label/combobox.component';
import { TextBoxComponent } from '../label/textbox.component';
import { CheckboxComponent } from '../label/checkbox.component';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html'
})

export class CompanyDetailComponent implements AfterViewInit, DoCheck {
  @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChildren(TextBoxComponent) textBoxs: QueryList<TextBoxComponent>;

  stores = Store[0];
  App: any = this;
  isPopUp: boolean = false;
  isSuperAdmin: boolean = false;


  constructor(private element: ElementRef,
    private commonService: CommonService) {
  }

  ngAfterViewInit() {
    let self = this;
    this.stores = Store.getAllStores(this.element.nativeElement, this, this.commonService);

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

    this.getDefaultCheckBoxValue();
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
    this.getDefaultComboBoxValues();
  }

  public getDefaultComboBoxValues(): void {
    if (this.comboBoxes) {
      let self = this;
      this.comboBoxes.toArray().forEach(comp => {
        Object.defineProperty(self, comp.props.ID.value, {
          writable: true,
          enumerable: true,
          configurable: true,
          value: comp
        });
      });
    }
  }

  private companyDetailLoaded(store, records) {

    if (this.isPopUp === false) {
      if (this.isSuperAdmin === false) {
        try {
          this.App.tabPanelCompany.setActiveTab(this.App.paymentSource);
        } catch (e) { }
        // this.App.companyDetail.setDisabled(true);
      }
      // this.App.btnCloceWindowCompany.hide();
    } else {
      // this.App.lblShowCompany.hide();
      // this.App.btnCloceWindowCompany.show();
    }

    if (records.length > 0) {
      let recordToLoad = this.App.dsCompanyDetail.data.items[0];
      if (recordToLoad != null) {

        // add case of store location
        if (records[0].data.CompanyID === 0) {
          this.App.dsCompanyDetail.data.items[0].newRecord = true;

          // this.App.lblCompanyHeaderAdd.show();
          // this.App.lblCompanyHeaderAdd.setText('Add a New Company');
          // document.getElementById('CompanyTitle').style.display = 'none';
        } else {
          if (recordToLoad.data != null) {
            // this.App.lblCompanyHeader.setText(recordToLoad.data.CompanyName);
          }

          // this.App.lblCompanyHeaderAdd.hide();
          // document.getElementById('CompanyTitle').style.display = 'block';

          // this.App.paymentSource.setDisabled(false);
          // this.App.companyReconParam.setDisabled(false);
          // this.App.fuelGradePanel.setDisabled(false);
          // this.App.userPanel.setDisabled(false);
        }

        this.App.cmbCountries.setValue(recordToLoad.data.CountyCode);
        let inputs = this.App.element.nativeElement.querySelectorAll('input');
        inputs.forEach(element => {
          if (element.attributes.ID !== undefined) {
            // return inputs.attributes.ID.value;
            if (element.attributes.ID.value === 'chkEnableMobLogging') {
              element.checked = recordToLoad.data.EnableMobileLogging;
            } else if (element.attributes.ID.value === 'chkIsInPosSyncStatus') {
              element.checked = recordToLoad.data.IsInPOSSyncStatus;
            } else if (element.attributes.ID.value === 'chkIsJobber') {
              element.checked = recordToLoad.data.IsJobber;
            } else {
              element.checked = recordToLoad.data.IsActive;
            }
          }
        });

        // inputArray.chkEnableMobLogging.checked = recordToLoad.data.EnableMobileLogging;
        // chkIsInPosSyncStatus.checked = recordToLoad.data.IsInPOSSyncStatus;
        // chkIsJobber.checked = recordToLoad.data.IsJobber;
        // chkIsActive.checked = recordToLoad.data.IsActive;

        // this.App.CompanyFormPanel.form.loadRecord(recordToLoad);
        // this.App.CompanyFormPanel.record = recordToLoad;
      }
    } else {
      this.App.CompanyFormPanel.form.reset();
    }
  };

}
