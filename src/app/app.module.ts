import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { Angular2DataTableModule } from 'angular2-data-table';
/* bootstrap components start */

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

/* bootstrap components end */


/* sky-app components start */

import { AppComponent } from './app.component';
import { LabelComponent } from './label/label.component';
import { ToolbarComponent } from './label/toolbar.component';
import { CheckboxComponent } from './label/checkbox.component';
import { NumberComponent } from './label/number.component';
import { FieldContainerComponent } from './label/field-container.component';
import { TextBoxComponent } from './label/textbox.component';
import { FieldSetComponent } from './label/field-set.component';
import { PanelComponent } from './label/panel.component';
import { ComboBoxComponent } from './label/combobox.component';
import { DateFieldComponent } from './label/date-field.component';
import { LinkButtonComponent } from './label/linkButton.component';
import { CommonService } from './label/common.service';
import { Store } from './label/store.component';
import { MyPageComponent } from './mypage.component';
import { ButtonComponent } from './label/button.component';
import { FormPanelComponent } from './label/form-panel.component';
import { ListenersComponent, ExtEvent, ClickEvent, ExtraParams, StoreParameter } from './label/listeners';
import { ExtBaseComponent } from './label/extbase';
import {
  DropdownModule,
  CalendarModule,
  ButtonModule,
  InputTextModule,
  MenubarModule,
} from 'primeng/primeng';
/* sky-app components end */

@NgModule({
  imports: [
    MenubarModule,
    BrowserModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Angular2DataTableModule,
    AlertModule
  ],
  declarations: [
    AppComponent,
    LinkButtonComponent,
    NumberComponent,
    CheckboxComponent,
    PanelComponent,
    ToolbarComponent,
    FieldContainerComponent,
    FormPanelComponent,
    TextBoxComponent,
    FieldSetComponent,
    DateFieldComponent,
    LabelComponent,
    ComboBoxComponent,
    MyPageComponent,
    ButtonComponent,
    ExtraParams,
    StoreParameter,
    ListenersComponent,
    ClickEvent
  ],
  providers: [ExtEvent, ExtBaseComponent, CommonService, Store],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
