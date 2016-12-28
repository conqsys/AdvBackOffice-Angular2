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
// import { SelectItem } from 'primeng/primeng';
// import { RadioComponent } from './label/radio.component';

@Component({
    selector: 'department-detail',
    templateUrl: './department-detail.component.html'
})

export class DepartmentDetailComponent implements DoCheck, OnInit, AfterViewInit {
    @ViewChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
    @ViewChildren(TextBoxComponent) textBoxs: QueryList<TextBoxComponent>;

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
    myParent: any;
    count: number = 0;
    constructor(private element: ElementRef,
        private commonService: CommonService) {

    }
    ngOnInit() {
        this.stores = Store.getAllStores(this.element.nativeElement, this.myParent, this.commonService);
        this.stores.forEach(store => {
            store.callService();
        });
    }

    ngAfterViewInit() {

        let self = this;
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
        this.getDefauldTextboxValue();

        
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
        

        // for (let i = 0; i < this.App.dsDepartments.allData.items.length; i++) {
        //     if (this.App.dsDepartments.allData.items[i].data.DepartmentID !== this.App.dsDepartmentHeader.data.items[0].data.DepartmentID) {
        //         if (this.App.dsDepartments.allData.items[i].data.DepartmentDescription.toLowerCase() ===
        //             this.App.txtDepDesc.getValue().toLowerCase()) {
        //             // showMessageInformation('Description already exists !');
        //             this.isSaveCloseClick = false;
        //             return false;
        //         }
        //     }
        // }

        this.App.dsDepartmentHeader.data.items[0].data.DisplayPromptMethodID = this.App.cmbDisPromptMethod.getValue();
        this.App.dsDepartmentHeader.data.items[0].data.DepartmentTypeID = this.App.cmbDepTypesA.getValue();
        this.App.DepartmentFormPanel.getForm().updateRecord(this.App.DepartmentFormPanel.record);
        this.App.dsDepartmentHeader.save();
        if (this.isSaveCloseClick === true) {
            // cancelDepartmentForm();
        }
        //     else {
        //     showMessageError('Fill the required field');

        // }
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
