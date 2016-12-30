// import { AppComponent } from './';
import {
    DoCheck, OnInit, Component, ViewContainerRef, ElementRef, TemplateRef, EventEmitter, Injectable,
    ViewChildren, ViewChild, QueryList, AfterViewInit
} from '@angular/core';
import { Store } from '../label/store.component';
// import { AppController } from './label/app-controller';
import { ComboBoxComponent } from '../label/combobox.component';
import { TextBoxComponent } from '../label/textbox.component';
import { CheckboxComponent } from '../label/checkbox.component';
// import { DateFieldComponent } from './label/date-field.component';
import { CommonService } from '../label/common.service';
import { FormPanelComponent } from '../label/form-panel.component';
// import { SelectItem } from 'primeng/primeng';
// import { RadioComponent } from './label/radio.component';

@Component({
    selector: 'department-detail',
    templateUrl: './department-detail.component.html'
})

export class DepartmentDetailComponent implements DoCheck, OnInit, AfterViewInit {
    @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
    //   @ViewChildren(DateFieldComponent) dateFields: QueryList<DateFieldComponent>;
    @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
    @ViewChildren(TextBoxComponent) textBoxs: QueryList<TextBoxComponent>;
    @ViewChildren(FormPanelComponent) formPanels: QueryList<TextBoxComponent>;

    // cmbStoreLocation: ComboBoxComponent;
    //   title = 'app works!';
    //   app: AppController;
    //   stores = Store[0];
    //   check: number = 1;
    //   myParent: any;
    //   cities: SelectItem[];
    //   selectedCity: any;
    //   App: any = this;
    //   radioComponentDetail: RadioComponent;
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
                const combo = this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value == store.key)[0];
                if (combo) {
                    combo.store = store;
                    console.log('test store');
                }
            });
        }

    }

    public saveDepartmentForm(): boolean {
        let msg = '';
        // if (App.DepartmentFormPanel.getForm().isValid()) {
        if (this.App.txtDepDesc.getValue() === '' || this.App.txtDepDesc.getValue() === null) {
            // showMessageInformation('Please Select Department Description!');
            this.isSaveCloseClick = false;
            return false;
        }

        this.App.dsDepartmentHeader.data.items[0].data.DisplayPromptMethodID = this.App.cmbDisPromptMethod.getValue();
        this.App.dsDepartmentHeader.data.items[0].data.DepartmentTypeID = this.App.cmbDepTypesA.getValue();
        // need to understand
        // this.App.DepartmentFormPanel.getForm().updateRecord(this.App.DepartmentFormPanel.record);
        this.App.dsDepartmentHeader.save();
        if (this.isSaveCloseClick === true) {
            // cancelDepartmentForm();
        }

    }

    public getDepIDBySelectedIndex(object): number {

        if (this.isNewDepartmentSource === false) {
            // if (object != "deploc") {
            if (this.isDepNext === false && this.isDepPrev === false) {
                // get selected index of grid                 
                if (this.App.grdDepartments.selModel.lastSelected != null) {
                    this.selIndex = this.depRowindex;
                }
                if (this.App.dsDepartments.data.items.length > 0 && this.isSaveCloseClick === false) {
                    if (this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID !== 0) {
                        this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
                    }
                }

            } else if (this.isDepNext === true) {
                // isDepNext = false;
                this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
            } else if (this.isDepPrev === true) {
                // isDepPrev = false;
                this.depID = this.App.dsDepartments.data.items[this.selIndex].data.DepartmentID;
            }
            this.App.lblCurrentRecord.setText(1 + this.selIndex + ' - ');
            this.totalRecord = this.App.dsDepartments.getCount();
            // need to conferm which relates to department.aspx page 
            // this.App.lblTotalRecord.setText(this.totalRecord);
        }
        return this.depID;

    }


    // load the selected department record on department detail form
    public departmentLoaded(store, records) {
        this.isSaveCloseClick = false;
        if (this.isNextorPrevClickdep === true) {
            //  App.TabPanel1.setActiveTab(activetabdep);
        }

        if (records != null && records.length > 0) {
            var recordToLoad = this.App.dsDepartmentHeader.data.items[0];

            if (recordToLoad != null) {

                // add case of department

                if (records[0].data.DepartmentID === 0) {

                    this.App.dsDepartmentHeader.data.items[0].newRecord = true;

                    this.App.lblHeaderAdd.show();
                    this.App.lblHeaderAdd.setText('Add a New Department');
                    this.App.btnMoveDepartment.hide();
                    document.getElementById("DepartmentTitle").style.display = "none";
                    document.getElementById("prevNextDepDiv").style.display = "none";
                    this.App.lnkPrevious.hide();
                    this.App.lnkNext.hide();


                } else {
                    // edit case of department
                    if (recordToLoad.data != null) {
                        // this.App.lblHeader.setText(recordToLoad.data.DepartmentDescription);
                    }

                    // this.App.lblHeaderAdd.hide();
                    // document.getElementById("DepartmentTitle").style.display = "block";
                    // document.getElementById("prevNextDepDiv").style.display = "block";


                    // this.App.lnkPrevious.show();
                    // this.App.lnkNext.show();
                    // recordToLoad.data.OldDepartmentDescription = recordToLoad.data.DepartmentDescription;
                }


                this.App.cmbDepTypesA.setValue(recordToLoad.data.DepartmentTypeID);
                this.App.cmbDisPromptMethod.setValue(recordToLoad.data.DisplayPromptMethodID);
                // App.txtDepProfitPercent.setValue(recordToLoad.data.ProfitPercent);

                this.App.DepartmentFormPanel.loadRecord(recordToLoad);
                // this.App.DepartmentFormPanel.record = recordToLoad; // need to undersatnd
                // this.App.cmbDepTypesA.setRawValue(recordToLoad.data.DepartmentTypeName);
                // this.App.cmbDisPromptMethod.setRawValue(recordToLoad.data.DisplayPromptMethodDesc);

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
        } else {
            // App.DepartmentFormPanel.form.reset();
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



    //   ngDoCheck() {
    // if (this.comboBoxes && this.check === 1) {
    //   // this.cmbStoreLocation = this.comboBoxes.toArray().filter(i => i.props.ID.value == 'cmbStoreLocation')[0];
    //   this.stores = Store.getAllStores(this.element.nativeElement, this.myParent, this.commonService);
    //   let self = this;
    //   this.check = 0;
    //   this.comboBoxes.toArray().forEach(comp => {
    //     Object.defineProperty(self, comp.props.ID.value, {
    //       writable: true,
    //       enumerable: true,
    //       configurable: true,
    //       value: comp
    //     });
    //   });


    //   //  alert(this.App.cmbStoreLocation);

    //   this.stores.forEach(store => {
    //     Object.defineProperty(self, store.key, {
    //       writable: true,
    //       enumerable: true,
    //       configurable: true,
    //       value: store
    //     });

    //   });

    //   this.stores.forEach(store => {
    //     store.callService();
    //   });
    //   // this.App.dsStoreLocation
    // }


    // if (this.comboBoxes) {
    //   this.stores.forEach(store => {

    //     const combo = this.comboBoxes.toArray().filter(i => i.props.StoreID && i.props.StoreID.value === store.key)[0];
    //     if (combo) {
    //       combo.store = store;
    //     }
    //   });
    // }

    // }

    doSomeThing() {

    }

    // public getValue() {

    // }

    // public setValue() {
    //     // this.App.dpPurchaseRepStartDate.setValue('12-01-2016');
    // }

    getDefaultRadioButtonsValue(): void {

        // if (this.radioButtons) {
        //   let self = this;
        //   this.radioButtons.toArray().forEach(comp => {
        //     Object.defineProperty(self, comp.ID, {
        //       writable: true,
        //       enumerable: true,
        //       configurable: true,
        //       value: comp
        //     });
        //   });
        //   console.log(this.App.rbTimeCardAll);
        //   this.App.rbTimeCardAll.setValue(true);
        // }
    }

    // radio click
    getClockOutValue() {
        //     console.log('call radio button ' + this.App.rbTimeCardAll.getValue());
        //    /* function to call radio component to set value */
        //      this.App.rbTimeCardAll.setValue(false);

        /* function to show and hide radio button */
        // this.App.rbTimeCardAll.show();
        // this.App.rbTimeCardAll.hide();

        /* function for getRawValue */
        // this.App.rbTimeCardAll.getRawValue();
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
